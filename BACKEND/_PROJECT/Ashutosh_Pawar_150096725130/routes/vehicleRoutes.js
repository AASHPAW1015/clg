const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields, validateId } = require("../middleware/validate");
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

router.use(verifyToken);

router.get("/", getVehicles);
router.get("/:id", validateId, getVehicleById);
router.post("/", checkRole("admin"), requireFields("plateNumber", "make", "model"), createVehicle);
router.put("/:id", validateId, updateVehicle);
router.delete("/:id", checkRole("admin"), validateId, deleteVehicle);

module.exports = router;
