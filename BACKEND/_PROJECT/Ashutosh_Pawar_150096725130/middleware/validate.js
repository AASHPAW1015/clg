const mongoose = require("mongoose");

// requireFields("vehicle", "issue") -> 400 if any of them is missing or empty
const requireFields = (...fields) => {
  return (request, response, next) => {
    const missing = fields.filter(
      (field) => request.body[field] === undefined || String(request.body[field]).trim() === "",
    );
    if (missing.length > 0) {
      return response.status(400).json({ message: `${missing.join(", ")} required!` });
    }
    next();
  };
};

const validateId = (request, response, next) => {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ message: "Invalid id!" });
  }
  next();
};

module.exports = { requireFields, validateId };
