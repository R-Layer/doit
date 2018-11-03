const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/user", userRoutes);
app.use("/", (req, res) =>
  res.status(200).json({ message: "Get out. GET OUT!" })
);

module.exports = app;
