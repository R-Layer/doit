const jwt = require("jsonwebtoken");
const configVars = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    req.tokenInfo = jwt.verify(
      req.headers.authorization,
      configVars.JWT_SECRET
    );

    next();
  } catch (err) {
    res.status(401).json({ fail: err });
  }
};
