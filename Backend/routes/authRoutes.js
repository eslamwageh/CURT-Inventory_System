const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authenticate } = require("../middlewares/auth");

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // checking if the user already exists to retur it
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  console.log("trying to login");
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log("failed to login");
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "asdfagsddasgdsgag",
    {
      expiresIn: "1h",
    }
  );
  console.log("loggedin success");
  res.status(200).json({
    status: "success",
    token,
    username,
  });
});

module.exports = router;
