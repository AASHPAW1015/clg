const MenuItems = require("../models/MenuItems");
const Restaurants = require("../models/Restaurants");

// GET /restaurants/:id/menu
const getMenuByRestaurant = async (request, response) => {
  try {
    const restaurant = await Restaurants.findById(request.params.id);

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not Found" });
    }

    const menuItems = await MenuItems.find({ restaurantId: request.params.id });
    return response.status(200).json(menuItems);
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid restaurant id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

// POST /restaurants/:id/menu
const createMenuItem = async (request, response) => {
  try {
    const { name, price, isAvailable } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (price === undefined) {
      return response.status(400).json({ message: "price is required!" });
    }

    if (price < 0) {
      return response.status(400).json({ message: "price cannot be negative!" });
    }

    // make sure the parent restaurant actually exists before attaching to it
    const restaurant = await Restaurants.findById(request.params.id);

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not Found" });
    }

    const menuItem = await MenuItems.create({
      restaurantId: request.params.id,
      name,
      price,
      isAvailable: isAvailable === undefined ? true : isAvailable,
    });

    return response.status(201).json({
      message: "menu item created successfully!!!!",
      menuItem,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid restaurant id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

// PUT /menu/:id
const updateMenuItem = async (request, response) => {
  try {
    const { name, price, isAvailable } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (price === undefined) {
      return response.status(400).json({ message: "price is required!" });
    }

    if (price < 0) {
      return response.status(400).json({ message: "price cannot be negative!" });
    }

    const menuItem = await MenuItems.findByIdAndUpdate(
      request.params.id,
      { name, price, isAvailable },
      { returnDocument: "after", runValidators: true },
    );

    if (!menuItem) {
      return response.status(404).json({ message: "Menu item not Found" });
    }

    return response.status(200).json({
      message: "menu item updated successfully!!!!",
      menuItem,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid menu item id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

// DELETE /menu/:id
const deleteMenuItem = async (request, response) => {
  try {
    const menuItem = await MenuItems.findByIdAndDelete(request.params.id);

    if (!menuItem) {
      return response.status(404).json({ message: "Menu item not Found" });
    }

    return response.status(200).json({
      message: "menu item deleted successfully!!!!",
      menuItem,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid menu item id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMenuByRestaurant,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
