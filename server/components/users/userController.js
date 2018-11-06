const User = require("./userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const defaultAvatar = {
  path: path.resolve(__dirname, "../../uploads/placeholder.png"),
  filename: "placeholder.png",
  mimeType: "image/png"
};

exports.user_create_one = (req, res) => {
  let avatar = req.file || defaultAvatar;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(409).json({
          fail: { errors: { email: { message: "Email already in use" } } }
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash =>
            new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              fromTime: req.body.fromTime,
              toTime: req.body.toTime,
              timezone: req.body.timezone,
              days: req.body.days,
              contacts: req.body.contacts,
              avatarImage: {
                binaryData: fs.readFileSync(avatar.path),
                mimeType: avatar.mimeType
              },
              avatarPath: avatar.filename
            }).save()
          )
          .then(userCreated =>
            res.status(201).json({
              newUser: {
                username: userCreated.username,
                email: userCreated.email,
                avatar: userCreated.avatarPath
              }
            })
          )
          .catch(err => {
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(500).json({ fail: err });
          });
      }
    })
    .catch(err => {
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ fail: err });
    });
};

exports.user_read_all = (req, res) => {
  User.find({})
    .exec()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};
