const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { name, username, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ message: "Name is required!" });
    } else if (!username) {
      return response.status(400).json({ message: "username is required!" });
    } else if (!email) {
      return response.status(400).json({ message: "email is required!" });
    } else if (!password) {
      return response.status(400).json({ message: "password is required!" });
    }

    const existingUsername = await User.findOne({ username: username });

    if (existingUsername) {
      return response
        .status(400)
        .json({ message: "this username alreaady exists!!" });
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return response
        .status(400)
        .json({ message: "this email already exists!!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      username,
      email,
      password: hashPassword,
    };

    const user = await User.create(newUser);
    return response
      .status(201)
      .json({ message: "user created successfully!!!!", user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username) {
      return response.status(400).json({ message: "username is required!" });
    }
    if (!password) {
      return response.status(400).json({ message: "password is required!" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return response.status(400).json({ message: "invalid credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(400)
        .json({ message: "Passwoprd is INCORRECT!!!!" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      "itm",
      { expiresIn: "1h" },
    );

    response.status(200).json({ message: "Login successful!!!", token });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.get("/profile", authMiddleware, (request, response) => {
  try {
    response.status(200).json({ message: "user data: ", user: request.user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
