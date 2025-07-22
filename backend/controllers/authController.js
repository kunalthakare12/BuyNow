const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to create JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "yoursecretkey", // Use a strong secret in production!
    { expiresIn: "7d" }
  );
};

// Signup controller
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create and save user
    const user = new User({ name, email, password });
    await user.save();

    // Create token
    const token = createToken(user);

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// Login controller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = createToken(user);

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};