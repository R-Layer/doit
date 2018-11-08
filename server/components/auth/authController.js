const configVars = require("../../config/keys");
const User = require("../users/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login_user = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (result) {
            let token = jwt.sign({ payload: user._id }, configVars.JWT_SECRET, {
              expiresIn: "1h"
            });
            res.status(200).json({ auth: token });
          } else {
            res.status(401).json({ fail: { message: "Login failed" } });
          }
        })
        .catch(err => {
          res.status(500).json({ fail: err });
        });
    } else {
      res.status(401).json({ fail: { message: "Login failed" } });
    }
  });
};
