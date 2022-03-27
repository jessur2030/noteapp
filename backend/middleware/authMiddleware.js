const pool = require("../config/db");
const jwt = require("jsonwebtoken");

//protect route function middleware
const protect = async (req, res, next) => {
  let token;
  //check for token in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from headers
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);

      //Get user from token
      req.user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        decoded.id,
      ]);
      // console.log(req.user);

      //call next
      next();
    } catch (error) {
      //
      console.error(error.message);
      res.status(401).send("Not authorized");
    }
  }

  if (!token) {
    console.error(error.message);
    res.status(401).send("Not authorized");
  }
};

module.exports = { protect };
