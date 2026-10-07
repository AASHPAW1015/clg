const Repair = require("../models/Repair");
const Vehicle = require("../models/Vehicle");
const Part = require("../models/Part");
const User = require("../models/User");
const notify = require("../utils/notify");

const HOUR_MS = 60 * 60 * 1000;

const formatTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

const populateRepair = (query) =>
  query
    .populate("vehicle", "plateNumber make model")
    .populate("reportedBy", "name")
    .populate("mechanic", "name")
    .populate("partsUsed.part", "name partNumber quantity reorderLevel");

// put stock back if a later part in the same repair runs out
const giveBack = async (taken) => {
  for (const item of taken) {
    await Part.updateOne({ _id: item.part }, { $inc: { quantity: item.quantity } });
  }
};

// takes parts out of stock. The quantity check and the $inc happen in one
// update, so stock never goes below 0 even if two repairs finish together.
const takeParts = async (request, partsUsed) => {
  const taken = [];
  for (const item of partsUsed) {
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      await giveBack(taken);
      return { error: "Each part needs a whole number quantity of at least 1!" };
    }

    const part = await Part.findOneAndUpdate(
      { _id: item.part, quantity: { $gte: quantity } },
      { $inc: { quantity: -quantity } },
      { returnDocument: "after" },
    );
    if (!part) {
      await giveBack(taken);
      return { error: "Part not found or not enough stock!" };
    }

    taken.push({ part: part._id, quantity, unitPrice: part.unitPrice });

    if (part.lowStock) {
      await notify(request.app, {
        title: "Low stock",
        body: `${part.name} (${part.partNumber}) is down to ${part.quantity}`,
        audience: "admins",
        sentBy: request.user.id,
      });
    }
  }
  return { taken };
};

// drivers see the issues they logged, mechanics and admins see everything
const getRepairs = async (request, response) => {
  const filter = {};
  if (request.user.role === "driver") {
    filter.reportedBy = request.user.id;
  }
  if (request.query.status) {
    filter.status = request.query.status;
  }
  const repairs = await populateRepair(Repair.find(filter).sort({ reportedAt: -1 }));
  return response.status(200).json({ count: repairs.length, repairs });
};

const getVehicleRepairs = async (request, response) => {
  const repairs = await populateRepair(
    Repair.find({ vehicle: request.params.id }).sort({ reportedAt: -1 }),
  );
  return response.status(200).json({ count: repairs.length, repairs });
};

const createRepair = async (request, response) => {
  const { issue, severity } = request.body;

  const vehicle = await Vehicle.findById(request.body.vehicle);
  if (!vehicle) {
    return response.status(404).json({ message: "Vehicle not found!" });
  }

  const repair = await Repair.create({
    vehicle: vehicle._id,
    issue,
    severity,
    reportedBy: request.user.id,
  });

  await notify(request.app, {
    title: `New issue on ${vehicle.plateNumber}`,
    body: `${request.user.name}: ${issue} (${repair.severity})`,
    audience: "mechanics",
    vehicle: vehicle._id,
    sentBy: request.user.id,
  });

  return response.status(201).json({ message: "Issue logged!", repair });
};

// reported -> scheduled -> in_progress -> completed
// in_progress takes the vehicle off the road, completed puts it back and
// works out downtime and cost
const updateRepair = async (request, response) => {
  const repair = await Repair.findById(request.params.id).populate("vehicle");
  if (!repair) {
    return response.status(404).json({ message: "Repair not found!" });
  }
  if (repair.status === "completed") {
    return response.status(400).json({ message: "This repair is already completed!" });
  }

  const { status, scheduledAt, laborCost, mechanic, partsUsed } = request.body;
  const vehicle = repair.vehicle;

  if (mechanic) {
    const mechanicUser = await User.findOne({ _id: mechanic, role: "mechanic" });
    if (!mechanicUser) {
      return response.status(400).json({ message: "mechanic must be a mechanic's user id!" });
    }
    repair.mechanic = mechanicUser._id;
  } else if (!repair.mechanic && request.user.role === "mechanic") {
    repair.mechanic = request.user.id;
  }

  if (laborCost !== undefined) {
    repair.laborCost = laborCost;
  }

  if (scheduledAt) {
    repair.scheduledAt = scheduledAt;
    if (repair.status === "reported") {
      repair.status = "scheduled";
    }
  }

  if (status) {
    repair.status = status;
  }

  if (repair.status === "in_progress" && !repair.startedAt) {
    repair.startedAt = new Date();
    vehicle.status = "in_service";
  }

  // catch a bad status or cost before any stock is taken
  await repair.validate();

  if (repair.status === "completed") {
    if (Array.isArray(partsUsed) && partsUsed.length > 0) {
      const { error, taken } = await takeParts(request, partsUsed);
      if (error) {
        return response.status(400).json({ message: error });
      }
      repair.partsUsed = taken;
      repair.partsCost = taken.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    }
    repair.completedAt = new Date();
    const start = repair.startedAt || repair.scheduledAt || repair.reportedAt;
    repair.downtimeHours = Math.max(0, Math.round(((repair.completedAt - start) / HOUR_MS) * 10) / 10);
    vehicle.status = "active";
  }

  await repair.save();
  await vehicle.save();

  if (scheduledAt) {
    await notify(request.app, {
      title: `Repair scheduled for ${vehicle.plateNumber}`,
      body: `${repair.issue} - slot ${formatTime(repair.scheduledAt)}`,
      audience: "drivers",
      vehicle: vehicle._id,
      sentBy: request.user.id,
    });
  }

  const updated = await populateRepair(Repair.findById(repair._id));
  return response.status(200).json({ message: "Repair updated!", repair: updated });
};

module.exports = { getRepairs, getVehicleRepairs, createRepair, updateRepair };
