const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields, validateId } = require("../middleware/validate");
const {
  getMaintenance,
  getVehicleMaintenance,
  createMaintenance,
  updateMaintenance,
} = require("../controllers/maintenanceController");

router.use(verifyToken);

router.get("/", getMaintenance);
router.get("/vehicle/:id", validateId, getVehicleMaintenance);
router.post(
  "/",
  checkRole("admin", "mechanic"),
  requireFields("vehicle", "type"),
  createMaintenance,
);
router.put("/:id", checkRole("admin", "mechanic"), validateId, updateMaintenance);

module.exports = router;
