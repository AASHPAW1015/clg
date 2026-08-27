const Services = require("../models/Services");
const Salons = require("../models/Salons");

async function getServicesBySalon(request, response) {
  try {
    // Check the salon exists first, otherwise a bad id just returns []
    // and the client cannot tell "no services" from "no such salon".
    const salon = await Salons.findById(request.params.id);
    if (!salon) {
      return response.status(404).json({ message: "Salon not found" });
    }

    const services = await Services.findBySalon(request.params.id);
    return response.status(200).json(services);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function getAvailableServices(request, response) {
  try {
    const services = await Services.findAvailable();
    return response.status(200).json(services);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function createService(request, response) {
  try {
    const { serviceName, price, duration, isAvailable } = request.body;

    if (!serviceName || price === undefined) {
      return response
        .status(400)
        .json({ message: "serviceName and price are required" });
    }

    if (isNaN(Number(price)) || Number(price) < 0) {
      return response.status(400).json({ message: "price must be a positive number" });
    }

    const salon = await Salons.findById(request.params.id);
    if (!salon) {
      return response.status(404).json({ message: "Salon not found" });
    }

    const service = await Services.create(request.params.id, {
      serviceName,
      price,
      duration,
      isAvailable: isAvailable === undefined ? true : isAvailable,
    });

    return response.status(201).json({ message: "Service created", service });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function updateService(request, response) {
  try {
    const { serviceName, price, duration, isAvailable } = request.body;

    // Body is camelCase (JS style), columns are snake_case (Postgres style),
    // so the names get mapped here.
    const fields = {};
    if (serviceName !== undefined) fields.service_name = serviceName;
    if (price !== undefined) fields.price = price;
    if (duration !== undefined) fields.duration = duration;
    if (isAvailable !== undefined) fields.is_available = isAvailable;

    if (Object.keys(fields).length === 0) {
      return response.status(400).json({ message: "No fields to update" });
    }

    const service = await Services.update(request.params.id, fields);
    if (!service) {
      return response.status(404).json({ message: "Service not found" });
    }

    return response.status(200).json({ message: "Service updated", service });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function deleteService(request, response) {
  try {
    const service = await Services.remove(request.params.id);
    if (!service) {
      return response.status(404).json({ message: "Service not found" });
    }
    return response.status(200).json({ message: "Service deleted", service });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

module.exports = {
  getServicesBySalon,
  getAvailableServices,
  createService,
  updateService,
  deleteService,
};
