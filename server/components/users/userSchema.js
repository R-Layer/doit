const Joi = require("joi");

const timezonesSchema = Joi.object({
  fromTime: Joi.string()
    .regex(/\d{2}:\d{2}/)
    .required(),
  toTime: Joi.string()
    .regex(/\d{2}:\d{2}/)
    .required(),
  timezone: Joi.string(),
  days: Joi.array()
    .min(1)
    .required(),
  key: Joi.number()
});

exports.registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(2)
    .max(15)
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required(),
  timezones: Joi.array().items(timezonesSchema),
  contacts: Joi.array(),
  avatar: Joi.any()
});

exports.updatePwdSchema = Joi.object({
  old_password: Joi.string()
    .trim()
    .min(6)
    .required(),
  new_password: Joi.string()
    .trim()
    .min(6)
    .required(),
  confirm_password: Joi.any().valid(Joi.ref("new_password"))
});
