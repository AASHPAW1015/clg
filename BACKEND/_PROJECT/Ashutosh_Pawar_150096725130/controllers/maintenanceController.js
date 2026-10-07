const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");
const notify = require("../utils/notify");
const { forecast, label } = require("../utils/forecast");

// how many km after the last service the next one is due
const INTERVAL_KM = {
  oil_change: 10000,
  tire_rotation: 8000,
  brake_inspection: 20000,
  general_service: 15000,
};

// loads records with their vehicle, adds the forecast, soonest first
const withForecast = async (filter) => {
  const records = await Maintenance.find(filter).populate(
    "vehicle",
    "plateNumber mileage avgKmPerDay",
  );
  return records
    .filter((record) => record.vehicle)
    .map((record) => ({ ...record.toJSON(), forecast: forecast(record, record.vehicle) }))
    .sort((a, b) => (a.forecast.daysLeft ?? Infinity) - (b.forecast.daysLeft ?? Infinity));
};

const alertsFrom = (records) =>
  records
    .filter((record) => ["overdue", "due soon"].includes(record.forecast.alert))
    .map((record) => record.forecast.message);

const getMaintenance = async (request, response) => {
  const filter = {};
  if (request.query.status) {
    filter.status = request.query.status;
  }
  const maintenance = await withForecast(filter);
  return response
    .status(200)
    .json({ count: maintenance.length, alerts: alertsFrom(maintenance), maintenance });
};

const getVehicleMaintenance = async (request, response) => {
  const vehicle = await Vehicle.findById(request.params.id);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }
  const maintenance = await withForecast({ vehicle: vehicle._id });
  return response.status(200).json({
    vehicle: vehicle.plateNumber,
    mileage: vehicle.mileage,
    alerts: alertsFrom(maintenance),
    maintenance,
  });
};

// dueAtKm is optional: without it the next due point is
// last service km (or current mileage) + the interval for that type
const createMaintenance = async (request, response) => {
  const { type, notes } = request.body;

  if (!INTERVAL_KM[type]) {
    return response
      .status(400)
      .json({ message: `type must be one of ${Object.keys(INTERVAL_KM).join(", ")}!` });
  }

  const vehicle = await Vehicle.findById(request.body.vehicle);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }

  let dueAtKm = request.body.dueAtKm;
  if (dueAtKm === undefined || dueAtKm === "") {
    const last = await Maintenance.findOne({ vehicle: vehicle._id, type, status: "completed" }).sort({
      completedAtKm: -1,
    });
    dueAtKm = (last ? last.completedAtKm : vehicle.mileage) + INTERVAL_KM[type];
  }

  const maintenance = await Maintenance.create({ vehicle: vehicle._id, type, dueAtKm, notes });

  await notify(request.app, {
    title: "Maintenance scheduled",
    body: `${vehicle.plateNumber} ${label(type)} scheduled at ${dueAtKm} km`,
    vehicle: vehicle._id,
    sentBy: request.user.id,
  });

  return response.status(201).json({
    message: "Maintenance scheduled!",
    maintenance: { ...maintenance.toJSON(), forecast: forecast(maintenance, vehicle) },
  });
};

// marking it completed also books the next one of the same type
const updateMaintenance = async (request, response) => {
  const maintenance = await Maintenance.findById(request.params.id);
  if (!maintenance) {
    return response.status(404).json({ message: "Maintenance not found!" });
  }

  const wasScheduled = maintenance.status === "scheduled";
  for (const field of ["dueAtKm", "cost", "notes", "status"]) {
    if (request.body[field] !== undefined) {
      maintenance[field] = request.body[field];
    }
  }

  const justCompleted = wasScheduled && maintenance.status === "completed";
  if (justCompleted) {
    const vehicle = await Vehicle.findById(maintenance.vehicle);
    maintenance.completedAt = new Date();
    maintenance.completedAtKm = Number(request.body.completedAtKm ?? vehicle.mileage);
  }
  await maintenance.save();

  let next = null;
  if (justCompleted) {
    next = await Maintenance.create({
      vehicle: maintenance.vehicle,
      type: maintenance.type,
      dueAtKm: maintenance.completedAtKm + INTERVAL_KM[maintenance.type],
    });
  }

  return response.status(200).json({ message: "Maintenance updated!", maintenance, next });
};

module.exports = {
  getMaintenance,
  getVehicleMaintenance,
  createMaintenance,
  updateMaintenance,
};
