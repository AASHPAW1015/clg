const jwt = require("jsonwebtoken");

// checks "Authorization: Bearer <token>" and puts the payload on request.user
const auth = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response
      .status(401)
      .json({ message: "no token provided, access denied!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response
        .status(401)
        .json({ message: "token expired, please login again!" });
    }
    return response.status(401).json({ message: "invalid token!" });
  }
};

module.exports = auth;
