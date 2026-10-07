const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const {
  getCostReport,
  getDowntimeReport,
  getBreakdownRisk,
} = require("../controllers/reportController");

router.use(verifyToken, checkRole("admin"));

router.get("/cost", getCostReport);
router.get("/downtime", getDowntimeReport);
router.get("/breakdown-risk", getBreakdownRisk);

module.exports = router;
