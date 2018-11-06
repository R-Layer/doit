const userSchemas = require("./users/userSchema");
const fs = require("fs");
const joi = require("joi").defaults(schema =>
  schema.options({
    abortEarly: false,
    allowUnknown: false
  })
);

const validator = (req, res, next) => {
  let schemaToCheckAgainst;
  switch (req.url) {
    case "/register":
      schemaToCheckAgainst = userSchemas.registerSchema;
      break;
    default:
      schemaToCheckAgainst = null;
      break;
  }

  joi.validate(req.body, schemaToCheckAgainst, (err, validData) => {
    if (err) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(422).json(err);
    } else {
      req.body = validData;
      next();
    }
  });
};

module.exports = validator;
