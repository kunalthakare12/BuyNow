const express = require("express");
const { signup, login } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Protected route: Get current user's profile
router.get("/me", auth, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
