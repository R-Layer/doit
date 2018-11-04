const User = require("./userModel");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");

const multerOptions = {
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "server/uploads/");
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

exports.user_create_one = (req, res) => {
  uploadAvatar(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ err, error: "Please check your image specs" });
    } else if (err) {
      res
        .status(400)
        .json({ err, error: "Something went wrong during the upload" });
    } else {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (user) {
            res.status(409).json({ error: "Email already in use" });
          } else {
            bcrypt
              .hash(req.body.password, 10)
              .then(hash => {
                const newUser = new User({
                  username: req.body.username,
                  email: req.body.email,
                  password: hash,
                  from: req.body["from-time"],
                  to: req.body["to-time"],
                  timezone: req.body.timezone,
                  days: req.body.days,
                  contacts: req.body.contacts,
                  avatarImage: {
                    binaryData: fs.readFileSync(req.file.path),
                    mimeType: req.file.mimeType
                  },
                  avatarPath: req.file.filename
                });

                newUser
                  .save()
                  .then(userCreated =>
                    res.status(201).json({
                      newUser: {
                        username: userCreated.username,
                        email: userCreated.email,
                        avatar: userCreated.avatarPath
                      }
                    })
                  )
                  .catch(err =>
                    res.status(500).json({
                      err,
                      error: "Error: user registration failed"
                    })
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
          res
            .status(500)
            .json({ err, error: "Error: user registration failed" })
        );
    }
  });
};

exports.user_read_all = (req, res) => {
  User.find({})
    .exec()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};
