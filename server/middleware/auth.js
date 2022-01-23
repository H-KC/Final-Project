const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // getting the token from the header
  const token = req.header("x-auth-token");
  // cheking if the token exists
  if (!token) {
    return res.status(401).json({ msg: "NO token ,Unotherized access" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "invalid token" });
  }
};
