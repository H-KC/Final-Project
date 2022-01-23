const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");
const Building = require("../models/Building");

//@route    GET api/buildings
//@desc     Get all users buldings
//@access   Private
router.get("/", auth, (req, res) => {
  Building.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

//@route    POST api/buildings
//@desc     add building
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("startDate", "start Date is required").not().isEmpty(),
      check("endDate", "end Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, budget, company, startDate, endDate } = req.body;

    try {
      Building.findOne({ name: req.body.name }, (err, foundItem) => {
        if (!foundItem) {
          const newBuilding = new Building({
            id,
            name,
            budget,
            company,
            startDate,
            endDate,
          });
          newBuilding.save((er, saved) => {
            if (saved) {
              res.json(saved);
            }
          });
        } else {
          res.json("0");
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Problem ...");
    }
  }
);

//@route    PUT api/buildings:id
//@desc     update building
//@access   Private
router.put("/:id", auth, (req, res) => {
  const { name, budget, company, startDate, endDate } = req.body;

  //building object
  const newBuilding = {};
  name && (newBuilding.name = name);
  budget && (newBuilding.budget = budget);
  company && (newBuilding.company = company);
  startDate && (newBuilding.startDate = startDate);
  endDate && (newBuilding.endDate = endDate);
  Building.findOne({ id: req.params.id }, (err, foundItem) => {
    if (foundItem) {
      if (foundItem.name === newBuilding.name) {
        Building.findOneAndUpdate(
          { id: req.params.id },
          { $set: newBuilding },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "not found.." });
            }
          }
        ).catch((err) => console.log(err));
      } else {
        Building.findOne({ name: newBuilding.name }, (er, found) => {
          if (!found) {
            Building.findOneAndUpdate(
              { id: req.params.id },
              { $set: newBuilding },
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
      res.json("No such user in db");
    }
  });
});

//@route    PUT api/buildings/budget/update
//@desc     update the budget
//@access   Private

router.put("/budget/update", auth, (req, res) => {
  const { id, amount } = req.body;

  Building.findOneAndUpdate(
    { id: id },
    { $set: { budget: Number(amount) } },
    (err, doc) => {
      if (doc) {
        res.json("succesfully updated");
      } else {
        return res.status(404).json({ msg: "item not found" });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    PUT api/building/bstate/update
//@desc     update the bstate
//@access   Private

router.put("/bstate/update", auth, (req, res) => {
  const { name, state } = req.body;

  Building.findOneAndUpdate(
    { name: name },
    { $set: { bstate: state } },
    (err, doc) => {
      if (doc) {
        res.json("succesfully updated bstate");
      } else {
        return res.status(404).json({ msg: "item not found" });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    PUT api/building/companyName/update
//@desc     update the company name
//@access   Private

router.put("/companyName/update", auth, (req, res) => {
  const { buildings, name } = req.body;
  buildings.forEach((item) => {
    Building.findOneAndUpdate({ id: item }, { $set: { company: name } }).catch(
      (err) => console.log(err)
    );
  });
  res.json("succesfully updated company name");
});

//@route    PUT api/building/prb/update
//@desc     update the prb
//@access   Private

router.put("/prb/update", auth, (req, res) => {
  const { name, val } = req.body;

  Building.findOneAndUpdate(
    { name: name },
    { $set: { currentStep: val } },
    (err, doc) => {
      if (doc) {
        res.json("succesfully updated prb");
      } else {
        return res.status(404).json({ msg: "item not found" });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    DELETE api/buildings:id
//@desc     delete building
//@access   Private
router.delete("/:id", auth, (req, res) => {
  Building.findOneAndRemove({ id: req.params.id }, (err, deletedItem) => {
    if (deletedItem) {
      res.json({ msg: `successfully deleted ${deletedItem.name}` });
    } else {
      res.json({ msg: "No such item" });
    }
  });
});
module.exports = router;
