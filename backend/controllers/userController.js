const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   /auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    // //check for input fields
    // if (!name || !email || !password) {
    //   res.status(400).send("Please include all fields");
    // }

    //2. check if user exits: (if user exits then throw error)
    const userExits = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (userExits.rows.length !== 0) {
      return res.status(401).send("An account already exists with this email.");
    }

    //3. Bcrypt th user password
    //salt password
    const salt = await bcrypt.genSaltSync(10);
    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    //4. Insert the new user into our database
    const user = await pool.query(
      "INSERT INTO users (user_name, user_email,user_password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    //5. Generate our jwt token
    //if user is create
    if (user) {
      res.status(201).json({
        user_id: user.rows[0].user_id,
        user_name: user.rows[0].user_name,
        user_email: user.rows[0].user_email,
        token: generateToken(user.rows[0].user_id),
      });
    } else {
      res.status(400).send("Invalid user data");
      //   throw new Error("Invalid user data");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Login a user
// @route   /auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    //1. destructure the req.body
    const { email, password } = req.body;
    //2. check if user doest exits (if not, then we throw error)
    //find user by email
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }
    //3. check if user incoming plain text password match to hashed password on our database
    if (user && (await bcrypt.compare(password, user.rows[0].user_password))) {
      res.status(200).json({
        user_id: user.rows[0].user_id,
        user_name: user.rows[0].user_name,
        user_email: user.rows[0].user_email,
        token: generateToken(user.rows[0].user_id),
      });
    } else {
      return res.status(401).json("Invalid credentials");
    }

    //4. give them jwt token
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get current user
// @route   /auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.send("Me!!!");
  } catch (error) {
    console.error(error.message);
    res.status(401).send("Not Authorize");
  }
};

//Generate JWT Token function
const generateToken = (user_id) => {
  //jwt sign
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    //token expires in 30 days
    expiresIn: "30d",
  });
};
//export our functions
module.exports = { registerUser, loginUser, getMe };
