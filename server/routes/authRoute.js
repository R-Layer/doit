const express = require("express");
const router = express.Router();

const { register_user } = require("../components/auth/authController");

router.post("/register", register_user);

module.exports = router;
