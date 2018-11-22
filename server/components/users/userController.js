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
          errors: [{ field: "email", message: "Email already in use" }]
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hash =>
            new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              timezones: req.body.timezones,
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
    .catch(err => res.status(500).json({ fail: err }));
};

exports.user_get_by_ID = (req, res) => {
  User.findOne({ _id: req.tokenInfo.id })
    .select("-avatarImage -password")
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => console.log(err));
};

exports.user_update_by_ID = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.tokenInfo.id },
    {
      $set: req.body
    },
    { new: true, runValidators: true }
  )
    .select("-avatarImage -password")
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => console.log(err));
};

exports.user_update_pwd_by_ID = (req, res) => {
  User.findOne({ _id: req.tokenInfo.id }).then(user => {
    if (user) {
      bcrypt
        .compare(req.body.old_password, user.password)
        .then(result => {
          if (result) {
            bcrypt
              .hash(req.body.new_password, 10)
              .then(hash => user.set({ password: hash }).save())
              .then(
                res
                  .status(200)
                  .json({ message: "password successfully changed" })
              )

              .catch(err =>
                res.status(500).json({ fail: { message: "Server error" }, err })
              );
          } else {
            res.status(401).json({
              fail: { message: "Old password does not match the actual one!" }
            });
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

exports.user_update_avt_by_ID = (req, res) => {
  let avatar = req.file || defaultAvatar;

  User.findOneAndUpdate(
    { _id: req.tokenInfo.id },
    {
      $set: {
        avatarImage: {
          binaryData: fs.readFileSync(avatar.path),
          mimeType: avatar.mimeType
        },
        avatarPath: avatar.filename
      }
    },
    { new: true }
  )
    .select("-avatarImage -password")
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => console.log(err));
};
