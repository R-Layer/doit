const User = require("./userModel");
const bcrypt = require("bcrypt");

exports.user_create_one = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(409).json({ error: "Email already in use" });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash => {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            newUser
              .save()
              .then(userCreated =>
                res.status(201).json({
                  newUser: {
                    name: userCreated.name,
                    email: userCreated.email
                  }
                })
              )
              .catch(err =>
                res
                  .status(500)
                  .json({ err, error: "Error: user registration failed" })
              );
          })
          .catch(err =>
            res
              .status(500)
              .json({ err, error: "Error: user registration failed" })
          );
      }
    })
    .catch(err =>
      res.status(500).json({ err, error: "Error: user registration failed" })
    );
};
