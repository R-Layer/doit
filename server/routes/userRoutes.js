const express = require("express");
const router = express.Router();

const { user_create_one } = require("../components/users/userController");

router.post("/register", user_create_one);

module.exports = router;
