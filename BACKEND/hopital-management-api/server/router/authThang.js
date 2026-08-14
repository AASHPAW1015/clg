const express = require("express");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username) {
      return response.status(400).json({ message: "username is required!" });
    } else if (!email) {
      return response.status(400).json({ message: "email is required!" });
    } else if (!password) {
      return response.status(400).json({ message: "password is required!" });
    }

    const existingUsername = await Users.findOne({ username: username });

    if (existingUsername) {
      return response
        .status(400)
        .json({ message: "this username alreaady exists!!" });
    }

    const existingEmail = await Users.findOne({ email: email });

    if (existingEmail) {
      return response
        .status(400)
        .json({ message: "this email already exists!!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashPassword,
    };

    const user = await Users.create(newUser);
    return response
      .status(201)
      .json({ message: "user created successfully!!!!", user });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.post("/login", (request, response, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) {
      return response.status(500).json({ message: error.message });
    }

    if (!user) {
      return response
        .status(401)
        .json({ message: info.message || "invalid credentials!" });
    }

    return response.status(200).json({
      message: "Login successful!!!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  })(request, response, next);
});

module.exports = router;
