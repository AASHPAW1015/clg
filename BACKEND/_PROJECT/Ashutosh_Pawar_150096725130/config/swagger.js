// OpenAPI 3.0 spec for Swagger UI at /api-docs.
// op() keeps each endpoint to one line: tag, summary, who can call it, example body.
const op = (tag, summary, { auth = true, body, id = false, query } = {}) => {
  const operation = { tags: [tag], summary, responses: { 200: { description: "OK" } } };
  if (auth) operation.security = [{ bearerAuth: [] }];
  if (body) {
    operation.requestBody = { required: true, content: { "application/json": { example: body } } };
  }
  operation.parameters = [];
  if (id) {
    operation.parameters.push({ name: "id", in: "path", required: true, schema: { type: "string" } });
  }
  if (query) {
    operation.parameters.push({ name: query, in: "query", required: false, schema: { type: "string" } });
  }
  return operation;
};

const vehicleBody = {
  plateNumber: "TR-456",
  make: "Tata",
  model: "Prima 4028",
  year: 2021,
  mileage: 50000,
  avgKmPerDay: 180,
};

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "FleetGuard - Fleet Maintenance Tracker API",
    version: "1.0.0",
    description:
      "Login first (POST /api/auth/login, e.g. admin@fleetguard.com / password123 after `npm run seed`), " +
      "copy the token and press Authorize.",
  },
  servers: [{ url: "/" }],
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
  },
  paths: {
    "/api/auth/register": {
      post: op("Auth", "Register as driver or mechanic", {
        auth: false,
        body: { name: "Ravi Kumar", email: "ravi@fleetguard.com", password: "password123", role: "driver" },
      }),
    },
    "/api/auth/login": {
      post: op("Auth", "Login, returns a JWT", {
        auth: false,
        body: { email: "admin@fleetguard.com", password: "password123" },
      }),
    },
    "/api/auth/firebase": {
      post: op("Auth", "Exchange a Firebase ID token for our JWT", {
        auth: false,
        body: { idToken: "<firebase id token>" },
      }),
    },
    "/api/auth/me": { get: op("Auth", "Logged in user") },
    "/api/auth/mechanics": { get: op("Auth", "List mechanics (admin, mechanic)") },

    "/api/vehicles": {
      get: op("Vehicles", "List vehicles", { query: "status" }),
      post: op("Vehicles", "Add a vehicle (admin)", { body: vehicleBody }),
    },
    "/api/vehicles/{id}": {
      get: op("Vehicles", "Vehicle with its driver", { id: true }),
      put: op("Vehicles", "Update vehicle (admin) or log odometer (driver, mechanic)", {
        id: true,
        body: { mileage: 50200 },
      }),
      delete: op("Vehicles", "Delete vehicle and its records (admin)", { id: true }),
    },

    "/api/maintenance": {
      get: op("Maintenance", "All schedules with due predictions", { query: "status" }),
      post: op("Maintenance", "Schedule a service by mileage (admin, mechanic)", {
        body: { vehicle: "<vehicle id>", type: "oil_change", dueAtKm: 60000 },
      }),
    },
    "/api/maintenance/vehicle/{id}": {
      get: op("Maintenance", "Schedules of one vehicle", { id: true }),
    },
    "/api/maintenance/{id}": {
      put: op("Maintenance", "Update or complete a service (admin, mechanic)", {
        id: true,
        body: { status: "completed", cost: 4500 },
      }),
    },

    "/api/repairs": {
      get: op("Repairs", "List repairs (drivers see their own)", { query: "status" }),
      post: op("Repairs", "Log an issue", {
        body: { vehicle: "<vehicle id>", issue: "Brake noise when stopping", severity: "high" },
      }),
    },
    "/api/repairs/vehicle/{id}": { get: op("Repairs", "Repairs of one vehicle", { id: true }) },
    "/api/repairs/{id}": {
      put: op("Repairs", "Assign, schedule, start or complete (admin, mechanic)", {
        id: true,
        body: {
          scheduledAt: "2026-10-08T14:00:00+05:30",
          status: "completed",
          laborCost: 1200,
          partsUsed: [{ part: "<part id>", quantity: 1 }],
        },
      }),
    },

    "/api/parts": {
      get: op("Parts", "Parts inventory (admin, mechanic)", { query: "lowStock" }),
      post: op("Parts", "Add a part (admin)", {
        body: { name: "Brake Pad Set", partNumber: "BP-220", category: "brakes", quantity: 12, unitPrice: 2400 },
      }),
    },
    "/api/parts/{id}": {
      get: op("Parts", "One part", { id: true }),
      put: op("Parts", "Update a part (admin)", { id: true, body: { quantity: 20 } }),
    },

    "/api/drivers": {
      get: op("Drivers", "List drivers (admin, mechanic)"),
      post: op("Drivers", "Add a driver (admin)", {
        body: { name: "Ravi Kumar", phone: "9876543210", licenseNumber: "MH0420210001234", vehicle: "<vehicle id>" },
      }),
    },
    "/api/drivers/{id}": {
      get: op("Drivers", "One driver", { id: true }),
      put: op("Drivers", "Update a driver (admin)", { id: true, body: { phone: "9876500000" } }),
    },

    "/api/reports/cost": { get: op("Reports", "Cost per vehicle and fleet cost per km (admin)") },
    "/api/reports/downtime": { get: op("Reports", "Downtime hours per vehicle (admin)") },
    "/api/reports/breakdown-risk": {
      get: op("Reports", "Breakdown risk from repair and service patterns (admin)"),
    },

    "/api/notifications": { get: op("Notifications", "Latest notifications for my role") },
    "/api/notifications/send": {
      post: op("Notifications", "Send a push notification (admin)", {
        body: { title: "Service day", body: "All trucks report to the depot on Monday", audience: "drivers" },
      }),
    },
  },
};
