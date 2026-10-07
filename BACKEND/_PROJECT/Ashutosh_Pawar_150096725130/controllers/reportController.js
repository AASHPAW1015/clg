const Vehicle = require("../models/Vehicle");
const Maintenance = require("../models/Maintenance");
const Repair = require("../models/Repair");

const DAY_MS = 24 * 60 * 60 * 1000;
const round = (value) => Math.round(value * 100) / 100;
const sameVehicle = (record, vehicle) => record.vehicle.equals(vehicle._id);

// maintenance + repair spend per vehicle, and cost per km driven
const getCostReport = async (request, response) => {
  const vehicles = await Vehicle.find().sort({ plateNumber: 1 });
  const maintenance = await Maintenance.find({ status: "completed" });
  const repairs = await Repair.find({ status: "completed" });

  const rows = vehicles.map((vehicle) => {
    const maintenanceCost = maintenance
      .filter((record) => sameVehicle(record, vehicle))
      .reduce((sum, record) => sum + record.cost, 0);
    const repairCost = repairs
      .filter((record) => sameVehicle(record, vehicle))
      .reduce((sum, record) => sum + record.totalCost, 0);
    const totalCost = maintenanceCost + repairCost;

    return {
      vehicle: vehicle.plateNumber,
      mileage: vehicle.mileage,
      maintenanceCost,
      repairCost,
      totalCost,
      costPerKm: vehicle.mileage ? round(totalCost / vehicle.mileage) : 0,
    };
  });

  const totalCost = rows.reduce((sum, row) => sum + row.totalCost, 0);
  const totalKm = rows.reduce((sum, row) => sum + row.mileage, 0);

  return response.status(200).json({
    fleet: {
      vehicles: rows.length,
      totalCost,
      totalKm,
      avgCostPerKm: totalKm ? round(totalCost / totalKm) : 0,
    },
    vehicles: rows,
  });
};

// hours each vehicle spent off the road for repairs
const getDowntimeReport = async (request, response) => {
  const vehicles = await Vehicle.find().sort({ plateNumber: 1 });
  const repairs = await Repair.find({ status: { $in: ["in_progress", "completed"] } });
  const now = Date.now();

  const rows = vehicles.map((vehicle) => {
    const own = repairs.filter((repair) => sameVehicle(repair, vehicle));
    const finished = own.filter((repair) => repair.status === "completed");
    const ongoing = own.find((repair) => repair.status === "in_progress");

    return {
      vehicle: vehicle.plateNumber,
      status: vehicle.status,
      repairs: finished.length,
      downtimeHours: round(finished.reduce((sum, repair) => sum + repair.downtimeHours, 0)),
      // still in the workshop: hours so far
      currentDowntimeHours: ongoing ? round((now - ongoing.startedAt) / (60 * 60 * 1000)) : 0,
    };
  });

  return response.status(200).json({
    fleet: {
      totalDowntimeHours: round(rows.reduce((sum, row) => sum + row.downtimeHours, 0)),
      vehiclesOffRoad: rows.filter((row) => row.status !== "active").length,
    },
    vehicles: rows.sort((a, b) => b.downtimeHours - a.downtimeHours),
  });
};

// Breakdown prediction from patterns. Each vehicle gets points for:
//   repairs in the last 90 days           2 each
//   high severity repairs in that window  2 each
//   the same issue word coming back       2
//   overdue maintenance                   3 each
// 6+ points = high risk, 3+ = medium, else low
const getBreakdownRisk = async (request, response) => {
  const vehicles = await Vehicle.find();
  const since = new Date(Date.now() - 90 * DAY_MS);
  const recentRepairs = await Repair.find({ reportedAt: { $gte: since } });
  const scheduled = await Maintenance.find({ status: "scheduled" });

  const rows = vehicles.map((vehicle) => {
    const repairs = recentRepairs.filter((repair) => sameVehicle(repair, vehicle));
    const high = repairs.filter((repair) => repair.severity === "high").length;
    const overdue = scheduled.filter(
      (record) => sameVehicle(record, vehicle) && record.dueAtKm <= vehicle.mileage,
    ).length;

    // first word of each issue, e.g. "brake noise" and "brake pads worn" -> "brake"
    const words = repairs.map((repair) => repair.issue.toLowerCase().split(" ")[0]);
    const repeated = words.find((word, index) => words.indexOf(word) !== index);

    let score = repairs.length * 2 + high * 2 + overdue * 3;
    const reasons = [];
    if (repairs.length) reasons.push(`${repairs.length} repair(s) in 90 days`);
    if (high) reasons.push(`${high} high severity`);
    if (repeated) {
      score += 2;
      reasons.push(`"${repeated}" problem keeps coming back`);
    }
    if (overdue) reasons.push(`${overdue} overdue service(s)`);

    return {
      vehicle: vehicle.plateNumber,
      mileage: vehicle.mileage,
      score,
      risk: score >= 6 ? "high" : score >= 3 ? "medium" : "low",
      reasons,
    };
  });

  return response.status(200).json({ vehicles: rows.sort((a, b) => b.score - a.score) });
};

module.exports = { getCostReport, getDowntimeReport, getBreakdownRisk };
