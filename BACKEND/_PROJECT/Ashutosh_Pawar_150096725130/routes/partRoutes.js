const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { requireFields, validateId } = require("../middleware/validate");
const { getParts, getPartById, createPart, updatePart } = require("../controllers/partController");

router.use(verifyToken, checkRole("admin", "mechanic"));

router.get("/", getParts);
router.get("/:id", validateId, getPartById);
router.post(
  "/",
  checkRole("admin"),
  requireFields("name", "partNumber", "quantity", "unitPrice"),
  createPart,
);
router.put("/:id", checkRole("admin"), validateId, updatePart);

module.exports = router;
