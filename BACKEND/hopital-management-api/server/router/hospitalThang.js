const express = require("express");
const Hospitals = require("../models/Hospitals");

const router = express.Router();

// must sit above "/:id", otherwise "/:id" swallows the word "available"
router.get("/available", async (request, response) => {
  try {
    const hospitals = await Hospitals.find({ availableBeds: { $gt: 0 } });
    return response.status(200).json(hospitals);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const hospitals = await Hospitals.find();
    return response.status(200).json(hospitals);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const hospital = await Hospitals.findById(request.params.id);
    if (!hospital) {
      return response.status(404).json({ message: "Hospital not Found" });
    }
    return response.status(200).json(hospital);
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid hospital id!" });
    }
    return response.status(500).json({ message: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const { name, city, totalBeds, availableBeds } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (!city) {
      return response.status(400).json({ message: "city is required!" });
    } else if (totalBeds === undefined) {
      return response.status(400).json({ message: "totalBeds is required!" });
    } else if (availableBeds === undefined) {
      return response
        .status(400)
        .json({ message: "availableBeds is required!" });
    }

    if (availableBeds > totalBeds) {
      return response
        .status(400)
        .json({ message: "availableBeds cannot be more than totalBeds!" });
    }

    const hospital = await Hospitals.create({
      name,
      city,
      totalBeds,
      availableBeds,
    });

    return response.status(201).json({
      message: "hospital created successfully!!!!",
      hospital,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { name, city, totalBeds, availableBeds } = request.body;

    if (!name) {
      return response.status(400).json({ message: "name is required!" });
    } else if (!city) {
      return response.status(400).json({ message: "city is required!" });
    } else if (totalBeds === undefined) {
      return response.status(400).json({ message: "totalBeds is required!" });
    } else if (availableBeds === undefined) {
      return response
        .status(400)
        .json({ message: "availableBeds is required!" });
    }

    if (availableBeds > totalBeds) {
      return response
        .status(400)
        .json({ message: "availableBeds cannot be more than totalBeds!" });
    }

    const hospital = await Hospitals.findByIdAndUpdate(
      request.params.id,
      { name, city, totalBeds, availableBeds },
      { new: true, runValidators: true },
    );

    if (!hospital) {
      return response.status(404).json({ message: "Hospital not Found" });
    }

    return response.status(200).json({
      message: "hospital updated successfully!!!!",
      hospital,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid hospital id!" });
    }
    return response.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const hospital = await Hospitals.findByIdAndDelete(request.params.id);

    if (!hospital) {
      return response.status(404).json({ message: "Hospital not Found" });
    }

    return response.status(200).json({
      message: "hospital deleted successfully!!!!",
      hospital,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return response.status(400).json({ message: "invalid hospital id!" });
    }
    return response.status(500).json({ message: error.message });
  }
});

module.exports = router;
