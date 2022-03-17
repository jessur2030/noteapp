const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

//initialize app
const app = express();

app.listen(PORT, (req, res) => {
  console.log(`server started on ${process.env.NODE_ENV}, on port ${PORT}`);
});
