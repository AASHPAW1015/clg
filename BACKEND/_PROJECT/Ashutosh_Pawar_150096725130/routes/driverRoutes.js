const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields, validateId } = require("../middleware/validate");
const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
} = require("../controllers/driverController");

router.use(verifyToken, checkRole("admin", "mechanic"));

router.get("/", getDrivers);
router.get("/:id", validateId, getDriverById);
router.post("/", checkRole("admin"), requireFields("name", "phone", "licenseNumber"), createDriver);
router.put("/:id", checkRole("admin"), validateId, updateDriver);

module.exports = router;
