const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const registerUser = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username) {
      return response.status(400).json({ message: "username is required!" });
    } else if (!email) {
      return response.status(400).json({ message: "email is required!" });
    } else if (!password) {
      return response.status(400).json({ message: "password is required!" });
    }

    if (password.length < 6) {
      return response
        .status(400)
        .json({ message: "password must be at least 6 characters!" });
    }

    const existingUsername = await Users.findOne({ username: username });

    if (existingUsername) {
      return response
        .status(400)
        .json({ message: "this username already exists!!" });
    }

    const existingEmail = await Users.findOne({ email: email });

    if (existingEmail) {
      return response
        .status(400)
        .json({ message: "this email already exists!!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      email,
      password: hashPassword,
    });

    return response.status(201).json({
      message: "user created successfully!!!!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email) {
      return response.status(400).json({ message: "email is required!" });
    } else if (!password) {
      return response.status(400).json({ message: "password is required!" });
    }

    const user = await Users.findOne({ email: email });

    // same message for both cases so nobody can guess which emails exist
    if (!user) {
      return response.status(401).json({ message: "invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(401).json({ message: "invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return response.status(200).json({
      message: "Login successful!!!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
