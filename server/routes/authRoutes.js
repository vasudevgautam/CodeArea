const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get current logged-in user
router.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

module.exports = router;