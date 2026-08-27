const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllRestaurants,
  getTopRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const {
  getMenuByRestaurant,
  createMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

// must sit above "/:id", otherwise "/:id" swallows the word "top"
router.get("/top", getTopRestaurants);

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.get("/:id/menu", getMenuByRestaurant);

// everything below needs a valid JWT
router.post("/", auth, createRestaurant);
router.put("/:id", auth, updateRestaurant);
router.delete("/:id", auth, deleteRestaurant);
router.post("/:id/menu", auth, createMenuItem);

module.exports = router;
