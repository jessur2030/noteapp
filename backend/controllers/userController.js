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
      return res.status(400).send("An account already exists with this email.");
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
        token: generateToken(user.user_id),
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

//Generate JWT Token function
const generateToken = (user_id) => {
  //jwt sign
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    //token expires in 30 days
    expiresIn: "30d",
  });
};
//export our functions
module.exports = { registerUser };
