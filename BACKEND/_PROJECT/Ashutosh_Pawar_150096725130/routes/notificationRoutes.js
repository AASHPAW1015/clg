const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const {
  sendNotification,
  getNotifications,
} = require("../controllers/notificationController");

router.use(verifyToken);

router.get("/", getNotifications);
router.post("/send", checkRole("admin"), requireFields("title", "body"), sendNotification);

module.exports = router;
