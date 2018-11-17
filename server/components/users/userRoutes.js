const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");
const validatorMw = require("../validatorMw");
const authorizationMw = require("../authorizationMw");

const {
  user_create_one,
  user_read_all,
  user_get_by_ID,
  user_update_by_ID
} = require("./userController");

const multerOptions = {
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, path.resolve(__dirname, "../../uploads"));
    },
    filename: function(req, file, callback) {
      const ext = file.mimetype.split("/")[1];
      callback(null, file.fieldname + "-" + Date.now() + "." + ext);
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  }
};

const uploadAvatar = multer(multerOptions).single("avatar");

router.post("/register", uploadAvatar, validatorMw, user_create_one);
router.get("/get-all", user_read_all);
router.get("/get-self", authorizationMw, user_get_by_ID);
router.patch("/update-self", authorizationMw, user_update_by_ID);

module.exports = router;
