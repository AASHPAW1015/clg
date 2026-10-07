const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");

const FIELDS = ["name", "phone", "licenseNumber", "licenseExpiry", "user", "vehicle"];

const populateDriver = (query) =>
  query.populate("vehicle", "plateNumber make model").populate("user", "name email");

// one vehicle has one driver: assigning it here takes it off anyone else
const assignVehicle = async (vehicleId, driverId) => {
  if (!vehicleId) {
    return true;
  }
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    return false;
  }
  await Driver.updateMany(
    { vehicle: vehicle._id, _id: { $ne: driverId } },
    { $unset: { vehicle: 1 } },
  );
  return true;
};

const getDrivers = async (request, response) => {
  const drivers = await populateDriver(Driver.find().sort({ name: 1 }));
  return response.status(200).json({ count: drivers.length, drivers });
};

const getDriverById = async (request, response) => {
  const driver = await populateDriver(Driver.findById(request.params.id));
  if (!driver) {
    return response.status(404).json({ message: "Driver not found!" });
  }
  return response.status(200).json({ driver });
};

const createDriver = async (request, response) => {
  const data = {};
  for (const field of FIELDS) {
    if (request.body[field]) {
      data[field] = request.body[field];
    }
  }

  const driver = new Driver(data);
  if (!(await assignVehicle(data.vehicle, driver._id))) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }
  await driver.save();

  return response.status(201).json({ message: "Driver added!", driver });
};

const updateDriver = async (request, response) => {
  const driver = await Driver.findById(request.params.id);
  if (!driver) {
    return response.status(404).json({ message: "Driver not found!" });
  }

  for (const field of FIELDS) {
    if (request.body[field] !== undefined) {
      // an empty string clears the field (e.g. vehicle: "" unassigns it)
      driver[field] = request.body[field] === "" ? undefined : request.body[field];
    }
  }

  if (!(await assignVehicle(driver.vehicle, driver._id))) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }
  await driver.save();

  return response.status(200).json({ message: "Driver updated!", driver });
};

module.exports = { getDrivers, getDriverById, createDriver, updateDriver };
