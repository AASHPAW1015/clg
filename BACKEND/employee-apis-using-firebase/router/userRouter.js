const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { name, username, email, password } = request.body;
    const existingUsername = await User.findUserByUsername(username);

    if (existingUsername) {
      return response.status(401).json({ message: "USer already exists!!!!" });
    }

    const existingEmail = await User.findUserByEmail(email);

    if (existingEmail) {
      return response
        .status(401)
        .json({ message: "Email already exists!!!!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      username,
      email,
      password: hashPassword,
    };

    const user = await User.create(newUser);

    response.status(201).json({ message: "Resgistration successful!!!", user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await User.findUserByUsername(username);

    if (!user) {
      return response
        .status(401)
        .json({ message: " username not valid!!!!!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(401).json({ message: "Invalid password!!!" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      "itm",
      { expiresIn: "1h" },
    );

    response.status(200).json({ message: "login successful!!!", token });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
