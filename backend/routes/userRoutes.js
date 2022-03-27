const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/authMiddleware");

//register
router.post("/register", validate, registerUser);
//login
router.post("/login", validate, loginUser);

//getMe
router.get("/me", protect, getMe);

module.exports = router;
