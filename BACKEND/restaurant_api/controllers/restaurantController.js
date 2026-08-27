const Restaurants = require("../models/Restaurants");
const MenuItems = require("../models/MenuItems");

const getAllRestaurants = async (request, response) => {
  try {
    const restaurants = await Restaurants.find();
    return response.status(200).json(restaurants);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

// top 5 by rating, highest first
const getTopRestaurants = async (request, response) => {
  try {
    const restaurants = await Restaurants.find().sort({ rating: -1 }).limit(5);
    return response.status(200).json(restaurants);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const getRestaurantById = async (request, response) => {
  try {
    const restaurant = await Restaurants.findById(request.params.id);

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not Found" });
    }

    return response.status(200).json(restaurant);
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid restaurant id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

const createRestaurant = async (request, response) => {
  try {
    const { name, city, address, cuisine, rating } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (!city) {
      return response.status(400).json({ message: "city is required!" });
    } else if (!address) {
      return response.status(400).json({ message: "address is required!" });
    } else if (!cuisine) {
      return response.status(400).json({ message: "cuisine is required!" });
    } else if (rating === undefined) {
      return response.status(400).json({ message: "rating is required!" });
    }

    if (rating < 0 || rating > 5) {
      return response
        .status(400)
        .json({ message: "rating must be between 0 and 5!" });
    }

    const restaurant = await Restaurants.create({
      name,
      city,
      address,
      cuisine,
      rating,
    });

    return response.status(201).json({
      message: "restaurant created successfully!!!!",
      restaurant,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const updateRestaurant = async (request, response) => {
  try {
    const { name, city, address, cuisine, rating } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (!city) {
      return response.status(400).json({ message: "city is required!" });
    } else if (!address) {
      return response.status(400).json({ message: "address is required!" });
    } else if (!cuisine) {
      return response.status(400).json({ message: "cuisine is required!" });
    } else if (rating === undefined) {
      return response.status(400).json({ message: "rating is required!" });
    }

    if (rating < 0 || rating > 5) {
      return response
        .status(400)
        .json({ message: "rating must be between 0 and 5!" });
    }

    const restaurant = await Restaurants.findByIdAndUpdate(
      request.params.id,
      { name, city, address, cuisine, rating },
      { returnDocument: "after", runValidators: true },
    );

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not Found" });
    }

    return response.status(200).json({
      message: "restaurant updated successfully!!!!",
      restaurant,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid restaurant id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

const deleteRestaurant = async (request, response) => {
  try {
    const restaurant = await Restaurants.findByIdAndDelete(request.params.id);

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not Found" });
    }

    // no point keeping menu items whose restaurant is gone
    await MenuItems.deleteMany({ restaurantId: restaurant._id });

    return response.status(200).json({
      message: "restaurant deleted successfully!!!!",
      restaurant,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid restaurant id!" });
    }
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getTopRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
