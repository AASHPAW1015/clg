const jwt = require("jsonwebtoken");

// Runs before protected routes. Expects: Authorization: Bearer <token>
function verifyToken(request, response, next) {
  const header = request.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return response.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    // jwt.verify throws when the token is fake, tampered with, or expired.
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    request.user = payload;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
