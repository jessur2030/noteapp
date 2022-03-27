const jwt = require("jsonwebtoken");

//protect middleware
const protect = async (req, res, next) => {
  try {
    //
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(401).json("Not Authorize");
    }

    //Verified jwt
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    //put payload into the req.user object
    req.user = payload;

    //
  } catch (error) {
    console.error(error.message);
    return res.status(401).json("Not Authorize");
  }
};

//export protect
module.exports = { protect };
