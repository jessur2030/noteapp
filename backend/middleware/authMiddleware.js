const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { use } = require("../utils/utils");

//protect route function middleware
const protect = use(async (req, res, next) => {
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
    } catch (err) {
      console.error(err);
      res.status(401);

      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
