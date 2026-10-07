const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields, validateId } = require("../middleware/validate");
const {
  getRepairs,
  getVehicleRepairs,
  createRepair,
  updateRepair,
} = require("../controllers/repairController");

router.use(verifyToken);

router.get("/", getRepairs);
router.get("/vehicle/:id", validateId, getVehicleRepairs);
router.post("/", requireFields("vehicle", "issue"), createRepair);
router.put("/:id", checkRole("admin", "mechanic"), validateId, updateRepair);

module.exports = router;
