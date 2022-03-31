const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 6000;

//initialize app
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(cors());
app.use(morgan("dev"));

//Routes

//register & login routes
app.use("/auth", require("./routes/userRoutes"));

//notes routes
app.use("/notes", require("./routes/noteRoutes"));

//error handler middleware
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server started on ${process.env.NODE_ENV}, on port ${PORT}`);
});
