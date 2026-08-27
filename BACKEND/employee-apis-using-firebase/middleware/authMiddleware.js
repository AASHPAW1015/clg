const authMiddleware = (request, response, next) => {
  const token = request.headers["token"];

  if (!token) {
    return response.status(400).json({ message: "Unauthorized Access!!!" });
  }

  const decodedToken = jwt.verify(token, "itm");

  if (!decodedToken) {
    return response.status(400).json({ message: "Token is not valid" });
  }

  request.user = decodedToken;

  next();
};

module.exports = authMiddleware;
