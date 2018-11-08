import jwt from "jsonwebtoken";
module.exports = (req, res, next) => {
  try {
    req.locals.tokenInfo = jwt.verify(
      req.headers.authorization,
      configVars.JWT_SECRET
    );
    next();
  } catch (err) {
    res.status(401).json({ fail: err });
  }
};
