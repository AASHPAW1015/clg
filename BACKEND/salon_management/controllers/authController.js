const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

async function register(request, response) {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    const existing = await Users.findByEmail(email);
    if (existing) {
      return response.status(400).json({ message: "Email already registered" });
    }

    // 10 salt rounds. bcrypt generates the salt and stores it inside the hash,
    // so we do not need a separate column for it.
    const hashed = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, email, password: hashed });

    return response.status(201).json({ message: "User registered", user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

async function login(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "email and password are required" });
    }

    const user = await Users.findByEmail(email);
    if (!user) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    // compare() re-hashes the plain password with the salt baked into
    // the stored hash, then checks if the two match.
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return response.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

module.exports = { register, login };
