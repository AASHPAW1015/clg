const Salons = require("../models/Salons");

async function getAllSalons(request, response) {
  try {
    const salons = await Salons.findAll();
    return response.status(200).json(salons);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function getTopSalons(request, response) {
  try {
    const salons = await Salons.findTopRated(5);
    return response.status(200).json(salons);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function getSalonsByCity(request, response) {
  try {
    const salons = await Salons.findByCity(request.params.city);
    return response.status(200).json(salons);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function getSalonById(request, response) {
  try {
    const salon = await Salons.findById(request.params.id);
    if (!salon) {
      return response.status(404).json({ message: "Salon not found" });
    }
    return response.status(200).json(salon);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function createSalon(request, response) {
  try {
    const { name, city, address, rating } = request.body;

    if (!name || !city) {
      return response.status(400).json({ message: "name and city are required" });
    }

    const salon = await Salons.create({ name, city, address, rating });
    return response.status(201).json({ message: "Salon created", salon });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function updateSalon(request, response) {
  try {
    const { name, city, address, rating } = request.body;

    // Only send the fields the client actually provided, so a PUT with
    // just { rating } does not wipe name and city to undefined.
    const fields = {};
    if (name !== undefined) fields.name = name;
    if (city !== undefined) fields.city = city;
    if (address !== undefined) fields.address = address;
    if (rating !== undefined) fields.rating = rating;

    if (Object.keys(fields).length === 0) {
      return response.status(400).json({ message: "No fields to update" });
    }

    const salon = await Salons.update(request.params.id, fields);
    if (!salon) {
      return response.status(404).json({ message: "Salon not found" });
    }

    return response.status(200).json({ message: "Salon updated", salon });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function deleteSalon(request, response) {
  try {
    const salon = await Salons.remove(request.params.id);
    if (!salon) {
      return response.status(404).json({ message: "Salon not found" });
    }
    return response.status(200).json({ message: "Salon deleted", salon });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllSalons,
  getTopSalons,
  getSalonsByCity,
  getSalonById,
  createSalon,
  updateSalon,
  deleteSalon,
};
