const jwt = require("jsonwebtoken");

// Expects: Authorization: Bearer <token>
// On success the token payload ({ id, name, email, role }) is put on request.user.
const verifyToken = (request, response, next) => {
  const header = request.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Please login first!" });
  }

  try {
    request.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired token!" });
  }
};

// runs after verifyToken. checkRole("admin", "mechanic") lets only those roles through
const checkRole = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return response
        .status(403)
        .json({ message: `Only ${roles.join(" / ")} can do this!` });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
