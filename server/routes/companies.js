const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");
const Company = require("../models/Company");

//@route    GET api/companies
//@desc     Get all users companies
//@access   Private
router.get("/", auth, (req, res) => {
  Company.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

//@route    POST api/companies
//@desc     add companies
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("id", "id is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("creationDate", "creationDate is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, description, creationDate } = req.body;
    try {
      Company.findOne({ name: req.body.name }, (err, foundItem) => {
        if (!foundItem) {
          const newCompany = new Company({
            id,
            name,
            description,
            creationDate,
          });
          newCompany.save((er, saved) => {
            if (saved) {
              res.json(saved);
            }
          });
        } else {
          res.json("0");
        }
      });
    } catch (err) {
      res.status(500).send("Server Problem ...");
    }
  }
);

//@route    PUT api/companies:id
//@desc     update companies
//@access   Private
router.put("/:id", auth, (req, res) => {
  const { name, description } = req.body;
  //building object
  const newCompany = {};
  description && (newCompany.description = description);
  name && (newCompany.name = name);
  Company.findOne({ id: req.params.id }, (err, foundItem) => {
    if (foundItem) {
      if (foundItem.name === newCompany.name) {
        Company.findOneAndUpdate(
          { id: req.params.id },
          { $set: newCompany },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "not found.." });
            }
          }
        ).catch((err) => console.log(err));
      } else {
        Company.findOne({ name: newCompany.name }, (er, found) => {
          if (!found) {
            Company.findOneAndUpdate(
              { id: req.params.id },
              { $set: newCompany },
              (err, doc) => {
                if (doc) {
                  res.json(doc);
                } else {
                  return res.status(404).json({ msg: "not found.." });
                }
              }
            ).catch((err) => console.log(err));
          } else {
            res.json("0");
          }
        });
      }
    } else {
      res.json("No such Item ");
    }
  });
});

//@route    PUT api/companies/state/update
//@desc     update companies
//@access   Private
router.put("/state/update", auth, (req, res) => {
  const {
    id,
    buildingsID,
    waterTowerID,
    pausedProjects,
    newProjects,
    inProgessProjects,
    finishedProjects,
  } = req.body;
  Company.findOneAndUpdate(
    { id: id },
    {
      $set: {
        buildingsID,
        waterTowerID,
        pausedProjects,
        newProjects,
        inProgessProjects,
        finishedProjects,
      },
    },
    (err, doc) => {
      if (doc) {
        res.json("succesfully updated");
      } else {
        return res.status(404).json({ msg: "not found.." });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    DELETE api/companies:id
//@desc     delete companies
//@access   Private
router.delete("/:id", auth, (req, res) => {
  Company.findOneAndRemove({ id: req.params.id }, (err, deletedItem) => {
    if (deletedItem) {
      res.json({ msg: `successfully deleted ${deletedItem.name}` });
    } else {
      res.json({ msg: "No such item" });
    }
  });
});
module.exports = router;
