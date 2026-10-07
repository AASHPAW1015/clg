const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Maintenance = require("../models/Maintenance");
const Repair = require("../models/Repair");
const notify = require("../utils/notify");
const { label } = require("../utils/forecast");

const ADMIN_FIELDS = ["plateNumber", "make", "model", "year", "mileage", "avgKmPerDay", "status"];

const getVehicles = async (request, response) => {
  const filter = {};
  if (request.query.status) {
    filter.status = request.query.status;
  }
  const vehicles = await Vehicle.find(filter).sort({ plateNumber: 1 });
  return response.status(200).json({ count: vehicles.length, vehicles });
};

const getVehicleById = async (request, response) => {
  const vehicle = await Vehicle.findById(request.params.id);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }
  const driver = await Driver.findOne({ vehicle: vehicle._id });
  return response.status(200).json({ vehicle, driver });
};

const createVehicle = async (request, response) => {
  const data = {};
  for (const field of ADMIN_FIELDS) {
    if (request.body[field] !== undefined) {
      data[field] = request.body[field];
    }
  }
  const vehicle = await Vehicle.create(data);
  return response.status(201).json({ message: "Vehicle added!", vehicle });
};

// admin can change everything, drivers and mechanics only log the odometer
const updateVehicle = async (request, response) => {
  const vehicle = await Vehicle.findById(request.params.id);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }

  if (request.body.mileage !== undefined && Number(request.body.mileage) < vehicle.mileage) {
    return response.status(400).json({ message: "Mileage cannot go down!" });
  }

  const oldMileage = vehicle.mileage;
  const fields = request.user.role === "admin" ? ADMIN_FIELDS : ["mileage"];
  for (const field of fields) {
    if (request.body[field] !== undefined) {
      vehicle[field] = request.body[field];
    }
  }
  await vehicle.save();

  // the odometer just passed a scheduled service -> alert that it is due now
  const nowDue = await Maintenance.find({
    vehicle: vehicle._id,
    status: "scheduled",
    dueAtKm: { $gt: oldMileage, $lte: vehicle.mileage },
  });
  for (const maintenance of nowDue) {
    await notify(request.app, {
      title: `${vehicle.plateNumber} service due`,
      body: `${vehicle.plateNumber} hit ${vehicle.mileage} km, ${label(maintenance.type)} is due now`,
      vehicle: vehicle._id,
      sentBy: request.user.id,
    });
  }

  return response.status(200).json({ message: "Vehicle updated!", vehicle });
};

const deleteVehicle = async (request, response) => {
  const vehicle = await Vehicle.findByIdAndDelete(request.params.id);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }
  await Maintenance.deleteMany({ vehicle: vehicle._id });
  await Repair.deleteMany({ vehicle: vehicle._id });
  await Driver.updateMany({ vehicle: vehicle._id }, { $unset: { vehicle: 1 } });
  return response.status(200).json({ message: "Vehicle deleted!", vehicle });
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
