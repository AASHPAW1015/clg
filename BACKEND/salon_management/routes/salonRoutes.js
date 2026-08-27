const express = require("express");
const verifyToken = require("../middleware/auth");
const salonController = require("../controllers/salonController");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// ORDER MATTERS. Express checks routes top to bottom and stops at the first
// match. If "/:id" came first it would swallow "/top" (id = "top") and
// Postgres would reject "top" as a uuid.
router.get("/top", salonController.getTopSalons);
router.get("/city/:city", salonController.getSalonsByCity);

router.get("/", salonController.getAllSalons);
router.get("/:id", salonController.getSalonById);
router.post("/", verifyToken, salonController.createSalon);
router.put("/:id", verifyToken, salonController.updateSalon);
router.delete("/:id", verifyToken, salonController.deleteSalon);

// Services that belong to one salon.
router.get("/:id/services", serviceController.getServicesBySalon);
router.post("/:id/services", verifyToken, serviceController.createService);

module.exports = router;
