const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// @route      GET api/auth
// @desc       Get logged in user
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// @route      POST api/auth
// @desc       Auth user & get Token
// @access     Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password incorrect.").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    User.findOne({ email }, (err, foundUser) => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, matched) => {
          if (matched) {
            const payload = {
              user: {
                id: foundUser.id,
              },
            };
            User.findOneAndUpdate(
              { email: foundUser.email },
              { $set: { status: "online", lastSeen: "now" } },
              (err, doc) => {
                if (doc) {
                  jwt.sign(
                    payload,
                    config.get("jwtsecret"),
                    { expiresIn: 360000 },
                    (err, token) => {
                      if (!err) {
                        res.json({ token });
                      } else {
                        console.log("err with the token" + err);
                      }
                    }
                  );
                } else {
                  return res.status(404).json({ msg: "not found.." });
                }
              }
            );
          } else {
            res.status(400).json({ msg: "Password incorrect" });
          }
        });
      } else {
        res.status(400).json({ msg: "Email is incorrect.." });
      }
    }).catch((err) => {
      console.log("in catch");
      console.log(err);
    });
  }
);

module.exports = router;
