const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const User = require("../models/User");

//@route    GET api/users
//@desc     Get All users
//@access   Private
router.get("/", auth, (req, res) => {
  User.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

//@route    POST api/users
//@desc     Register a user
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please entre a valid email").isEmail(),
      check("password", "Password length should be > 6 chars ").isLength({
        min: 6,
      }),
      check("role", "role is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, email, password, role } = req.body;
    // checking if user already exists if not adding it
    User.findOne({ email }, (err, foundUser) => {
      if (foundUser) {
        res.json({ msg: "0" });
      } else {
        user = new User({
          id,
          name,
          email,
          password,
          role,
        });
        //generate salte and encrype the password
        bcrypt.hash(password, 10, (err, hash) => {
          if (!err) {
            user.password = hash;
            user.save();
            // const payload = {
            //   user: {
            //     id: user.id,
            //   },
            // };
            // jwt.sign(
            //   payload,
            //   config.get("jwtsecret"),

            //   (err, token) => {
            //     if (!err) {
            //       res.json({ token });
            //     } else {
            //       console.log("err with the token" + err);
            //     }
            //   }
            // );
          } else {
            console.log(err);
            res.status(500).send("Server error..");
          }
        });
        res.json(user);
      }
    });
  }
);

//@route    DELETE api/users
//@desc     Delete a user
//@access   Private
router.delete("/:id", auth, (req, res) => {
  User.findOneAndRemove({ _id: req.params.id }, (err, deletedItem) => {
    if (deletedItem) {
      res.json({ msg: `successfully deleted ` });
    } else {
      res.json({ msg: "No such item" });
    }
  });
});

//@route    PUT api/users
//@desc     Update a user
//@access   Private
router.put("/:id", auth, (req, res) => {
  const { id, newRole } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $set: { role: newRole } },
    (err, doc) => {
      if (doc) {
        res.json(doc);
      } else {
        return res.status(404).json({ msg: "not found.." });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    PUT api/users
//@desc     Update a user
//@access   Private
router.put("/logout/:id", auth, (req, res) => {
  const date = new Date().toJSON();
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: "offline", lastSeen: date } },
    (err, doc) => {
      if (doc) {
        res.json(doc);
      } else {
        return res.status(404).json({ msg: "not found.." });
      }
    }
  ).catch((err) => console.log(err));
});

module.exports = router;
