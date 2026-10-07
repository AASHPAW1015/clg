const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const firebase = require("../config/firebase");

// role is inside the token, so role checks need no database read
const signToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

const register = async (request, response) => {
  const { name, email, password } = request.body;
  const role = request.body.role || "driver";

  if (!["driver", "mechanic"].includes(role)) {
    return response
      .status(400)
      .json({ message: "role must be driver or mechanic! Admins come from the seed script." });
  }

  if (String(password).length < 6) {
    return response.status(400).json({ message: "password must be at least 6 characters!" });
  }

  const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) {
    return response.status(409).json({ message: "This email is already registered!" });
  }

  const hashed = await bcrypt.hash(String(password), 10);
  const user = await User.create({ name, email, password: hashed, role });

  return response
    .status(201)
    .json({ message: "User registered!", token: signToken(user), user });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (!user || !user.password || !(await bcrypt.compare(String(password), user.password))) {
    return response.status(401).json({ message: "Invalid credentials!" });
  }

  return response.status(200).json({ message: "Login successful", token: signToken(user), user });
};

// The client signs in with Firebase Auth and sends the Firebase ID token here.
// We verify it with the Admin SDK and hand back our own JWT, so the rest of
// the API works the same no matter how the user logged in.
const firebaseLogin = async (request, response) => {
  if (!firebase) {
    return response.status(503).json({ message: "Firebase is not configured on this server!" });
  }

  let decoded;
  try {
    decoded = await firebase.auth.verifyIdToken(request.body.idToken);
  } catch (error) {
    return response.status(401).json({ message: "Invalid Firebase token!" });
  }

  let user = await User.findOne({ email: decoded.email });
  if (!user) {
    user = await User.create({
      name: decoded.name || decoded.email.split("@")[0],
      email: decoded.email,
      firebaseUid: decoded.uid,
    });
  }

  return response.status(200).json({ message: "Login successful", token: signToken(user), user });
};

const getMe = async (request, response) => {
  const user = await User.findById(request.user.id);
  if (!user) {
    return response.status(404).json({ message: "User not found!" });
  }
  return response.status(200).json({ user });
};

const getMechanics = async (request, response) => {
  const mechanics = await User.find({ role: "mechanic" }).sort({ name: 1 });
  return response.status(200).json({ count: mechanics.length, mechanics });
};

module.exports = { register, login, firebaseLogin, getMe, getMechanics };
