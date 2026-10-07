// Fills the database with demo data: 3 logins, 4 trucks, drivers, parts,
// service history and past repairs. Wipes the FleetGuard collections first.
// Run: npm run seed
require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Driver = require("./models/Driver");
const Part = require("./models/Part");
const Maintenance = require("./models/Maintenance");
const Repair = require("./models/Repair");
const Notification = require("./models/Notification");

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const daysAgo = (days) => new Date(Date.now() - days * DAY_MS);

// a finished repair: reported `days` ago, off the road for `hours`
const pastRepair = (vehicle, issue, severity, days, hours, laborCost, extra = {}) => ({
  vehicle,
  issue,
  severity,
  status: "completed",
  reportedAt: daysAgo(days),
  startedAt: daysAgo(days - 1),
  completedAt: new Date(daysAgo(days - 1).getTime() + hours * HOUR_MS),
  downtimeHours: hours,
  laborCost,
  ...extra,
});

const seed = async () => {
  await mongoose.connect(process.env.MONGOOSE_URI);

  for (const model of [User, Vehicle, Driver, Part, Maintenance, Repair, Notification]) {
    await model.deleteMany({});
  }

  const password = await bcrypt.hash("password123", 10);
  const [, mechanic, driverUser] = await User.create([
    { name: "Fleet Manager", email: "admin@fleetguard.com", password, role: "admin" },
    { name: "Suresh Patil", email: "mechanic@fleetguard.com", password, role: "mechanic" },
    { name: "Ravi Kumar", email: "driver@fleetguard.com", password, role: "driver" },
  ]);

  const [tr456, tr789, tr123, tr321] = await Vehicle.create([
    { plateNumber: "TR-456", make: "Tata", model: "Prima 4028", year: 2021, mileage: 50000, avgKmPerDay: 180 },
    { plateNumber: "TR-789", make: "Ashok Leyland", model: "Ecomet 1615", year: 2020, mileage: 31200, avgKmPerDay: 120 },
    { plateNumber: "TR-123", make: "Eicher", model: "Pro 3015", year: 2018, mileage: 88500, avgKmPerDay: 160 },
    { plateNumber: "TR-321", make: "BharatBenz", model: "1917R", year: 2023, mileage: 12400, avgKmPerDay: 200 },
  ]);

  await Driver.create([
    { name: "Ravi Kumar", phone: "9876543210", licenseNumber: "MH0420210001234", licenseExpiry: "2031-05-01", user: driverUser._id, vehicle: tr456._id },
    { name: "Amit Shinde", phone: "9822001122", licenseNumber: "MH1220190004567", licenseExpiry: "2029-08-15", vehicle: tr789._id },
    { name: "Sunil Yadav", phone: "9930112233", licenseNumber: "MH0120170007890", licenseExpiry: "2027-01-20", vehicle: tr123._id },
  ]);

  const [, , brakePads] = await Part.create([
    { name: "Engine Oil 15W-40 (20L)", partNumber: "EO-1540", category: "engine", quantity: 10, unitPrice: 3200 },
    { name: "Oil Filter", partNumber: "OF-110", category: "engine", quantity: 15, unitPrice: 450 },
    { name: "Brake Pad Set", partNumber: "BP-220", category: "brakes", quantity: 6, unitPrice: 2400 },
    { name: "Tyre 295/80 R22.5", partNumber: "TY-295", category: "tyres", quantity: 8, unitPrice: 18500, reorderLevel: 4 },
    { name: "Air Filter", partNumber: "AF-330", category: "engine", quantity: 3, unitPrice: 900 },
  ]);

  const done = (vehicle, type, km, cost, days) => ({
    vehicle,
    type,
    dueAtKm: km,
    status: "completed",
    completedAtKm: km,
    completedAt: daysAgo(days),
    cost,
  });

  await Maintenance.create([
    // TR-456 is at 50,000 km -> oil change due now
    done(tr456._id, "oil_change", 40000, 4800, 60),
    { vehicle: tr456._id, type: "oil_change", dueAtKm: 50000 },
    done(tr456._id, "tire_rotation", 48000, 2500, 12),
    { vehicle: tr456._id, type: "tire_rotation", dueAtKm: 56000 },
    // TR-789: 1,600 km left at 120 km/day -> tires due in about 2 weeks
    done(tr789._id, "tire_rotation", 24800, 2500, 60),
    { vehicle: tr789._id, type: "tire_rotation", dueAtKm: 32800 },
    done(tr789._id, "oil_change", 24800, 4500, 60),
    { vehicle: tr789._id, type: "oil_change", dueAtKm: 34800 },
    // TR-123 is overdue on oil
    done(tr123._id, "oil_change", 78000, 4800, 70),
    { vehicle: tr123._id, type: "oil_change", dueAtKm: 88000 },
    done(tr123._id, "brake_inspection", 80000, 3000, 50),
    { vehicle: tr123._id, type: "brake_inspection", dueAtKm: 100000 },
    { vehicle: tr321._id, type: "oil_change", dueAtKm: 22400 },
  ]);

  // TR-123 keeps having brake trouble -> high breakdown risk
  await Repair.create([
    pastRepair(tr123._id, "Brake pads worn out", "high", 40, 20, 1500, {
      reportedBy: driverUser._id,
      mechanic: mechanic._id,
      partsUsed: [{ part: brakePads._id, quantity: 2, unitPrice: 2400 }],
      partsCost: 4800,
    }),
    pastRepair(tr123._id, "Brake fluid leak", "medium", 15, 8, 800, { mechanic: mechanic._id }),
    pastRepair(tr123._id, "Suspension noise on bumps", "low", 70, 6, 2000, { mechanic: mechanic._id }),
    pastRepair(tr456._id, "Clutch slipping", "medium", 120, 30, 6000, { mechanic: mechanic._id }),
    pastRepair(tr789._id, "Headlight not working", "low", 20, 2, 300, { mechanic: mechanic._id }),
  ]);

  console.log("seeded! logins (password123): admin@fleetguard.com, mechanic@fleetguard.com, driver@fleetguard.com");
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
