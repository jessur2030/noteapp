const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const validate = require("../middleware/validate");

//register
router.post("/register", validate, registerUser);
//login
router.post("/login", validate, loginUser);

module.exports = router;
