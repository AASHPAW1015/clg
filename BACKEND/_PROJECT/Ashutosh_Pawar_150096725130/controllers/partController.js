const Part = require("../models/Part");

const FIELDS = ["name", "partNumber", "category", "quantity", "unitPrice", "reorderLevel"];

const getParts = async (request, response) => {
  const filter = {};
  if (request.query.lowStock === "true") {
    filter.$expr = { $lte: ["$quantity", "$reorderLevel"] };
  }
  const parts = await Part.find(filter).sort({ name: 1 });
  return response.status(200).json({ count: parts.length, parts });
};

const getPartById = async (request, response) => {
  const part = await Part.findById(request.params.id);
  if (!part) {
    return response.status(404).json({ message: "Part not found!" });
  }
  return response.status(200).json({ part });
};

const createPart = async (request, response) => {
  const data = {};
  for (const field of FIELDS) {
    if (request.body[field] !== undefined) {
      data[field] = request.body[field];
    }
  }
  const part = await Part.create(data);
  return response.status(201).json({ message: "Part added!", part });
};

const updatePart = async (request, response) => {
  const part = await Part.findById(request.params.id);
  if (!part) {
    return response.status(404).json({ message: "Part not found!" });
  }
  for (const field of FIELDS) {
    if (request.body[field] !== undefined) {
      part[field] = request.body[field];
    }
  }
  await part.save();
  return response.status(200).json({ message: "Part updated!", part });
};

module.exports = { getParts, getPartById, createPart, updatePart };
