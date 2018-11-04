const express = require("express");
const router = express.Router();

const {
  user_create_one,
  user_read_all
} = require("../components/users/userController");

router.post("/register", user_create_one);

router.get("/get-all", user_read_all);

module.exports = router;
