// ============================================================
// buffer.js — throwaway demo. Delete when done reading.
// Shows the SAME route written 2 ways.
// Example used: "get employee by id" from your employees-crud-api.
// ============================================================

// ------------------------------------------------------------
// WAY 1 — what you did before. Logic lives inside the router.
// ------------------------------------------------------------

// file: router/employeerouter.js
router.get("/:id", async (request, response) => {
  try {
    const foundEmployee = await employee.findById(request.params.id);
    if (!foundEmployee) {
      return response.status(404).json({ message: "Employee not Found" });
    }
    response.status(200).json(foundEmployee);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// ------------------------------------------------------------
// WAY 2 — same thing, split. Nothing is added or removed,
// the callback just moves to its own file and gets a name.
// ------------------------------------------------------------

// file: controllers/employeeController.js
const getEmployeeById = async (request, response) => {
  try {
    const foundEmployee = await employee.findById(request.params.id);
    if (!foundEmployee) {
      return response.status(404).json({ message: "Employee not Found" });
    }
    response.status(200).json(foundEmployee);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// several handlers get exported together as one object
module.exports = { getEmployeeById /* , getAllEmployees, createEmployee, ... */ };

// file: router/employeerouter.js
const { getEmployeeById } = require("../controllers/employeeController");

router.get("/:id", getEmployeeById);
//              ^ no parens. you pass the function, express calls it later.

// ============================================================
// THAT IS THE WHOLE IDEA.
//
// A controller is a normal async (request, response) function
// that you gave a name and put in another file.
// No new syntax. No magic. Nothing to learn.
//
// Router answers: which URL runs which function
// Controller answers: what that function actually does
// ============================================================

// ------------------------------------------------------------
// What your router/hospitalRoutes.js ends up looking like.
// Whole API readable in one screen — that is the payoff.
// ------------------------------------------------------------

const {
  getAllHospitals,
  getAvailableHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");

router.get("/available", getAvailableHospitals); // MUST sit above "/:id"
router.get("/", getAllHospitals);
router.get("/:id", getHospitalById);
router.post("/", createHospital);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);

// Why "/available" goes first: express checks routes top to bottom and
// stops at the first match. "/:id" matches ANY single segment, including
// the literal text "available" — so if "/:id" is above it, your available
// route never runs and you get a CastError instead.
