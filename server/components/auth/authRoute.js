const express = require("express");
const router = express.Router();
const { login_user } = require("./authController");

router.post("/login", login_user);

module.exports = router;
