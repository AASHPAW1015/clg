const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const {
  register,
  login,
  firebaseLogin,
  getMe,
  getMechanics,
} = require("../controllers/authController");

router.post("/register", requireFields("name", "email", "password"), register);
router.post("/login", requireFields("email", "password"), login);
router.post("/firebase", requireFields("idToken"), firebaseLogin);
router.get("/me", verifyToken, getMe);
router.get("/mechanics", verifyToken, checkRole("admin", "mechanic"), getMechanics);

module.exports = router;
