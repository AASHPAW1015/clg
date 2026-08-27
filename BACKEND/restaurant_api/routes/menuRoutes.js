const express = require("express");
const auth = require("../middleware/auth");
const {
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.put("/:id", auth, updateMenuItem);
router.delete("/:id", auth, deleteMenuItem);

module.exports = router;
