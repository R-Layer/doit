const userSchemas = require("./users/userSchema");
const fs = require("fs");
const joi = require("joi");

const validator = (req, res, next) => {
  let schemaToCheckAgainst;
  switch (req.url) {
    case "/register":
      schemaToCheckAgainst = userSchemas.registerSchema;
      break;
    case "/update-pwd-self":
      schemaToCheckAgainst = userSchemas.updatePwdSchema;
      break;
    default:
      schemaToCheckAgainst = null;
      break;
  }

  joi.validate(
    req.body,
    schemaToCheckAgainst,
    {
      abortEarly: false,
      allowUnknown: false
    },
    (err, validData) => {
      if (err) {
        if (req.file) fs.unlinkSync(req.file.path);

        /*
        Custom error structure: 
        {
          fieldname: ['error message 1', 'error message 2',...]
        },
        {
          ...
        }
        */

        const customErrors = {};
        for (let error of err.details) {
          let customMessage = error.message.replace(/\"/g, "");
          if (customErrors.hasOwnProperty(error.context.key)) {
            customErrors[error.context.key].push(customMessage);
          } else {
            customErrors[error.context.key] = [customMessage];
          }
        }

        return res.status(422).json({ errors: customErrors });
      } else {
        req.body = validData;
        next();
      }
    }
  );
};

module.exports = validator;
