const express = require("express");
const verifyToken = require("../middleware/auth");
const serviceController = require("../controllers/serviceController");

const router = express.Router();

// Again: "/available" must be declared before "/:id".
router.get("/available", serviceController.getAvailableServices);

router.put("/:id", verifyToken, serviceController.updateService);
router.delete("/:id", verifyToken, serviceController.deleteService);

module.exports = router;
