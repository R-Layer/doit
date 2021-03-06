const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const authRoute = require("./components/auth/authRoute");
const userRoutes = require("./components/users/userRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/user", userRoutes);
app.use("/", (req, res) =>
  res.status(200).json({ message: "Get out. GET OUT!" })
);

module.exports = app;
