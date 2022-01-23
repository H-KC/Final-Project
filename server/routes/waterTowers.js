const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");
const WaterTower = require("../models/WaterTower");

//@route    GET api/waterTowers
//@desc     Get all users waterTowers
//@access   Private
router.get("/", auth, (req, res) => {
  WaterTower.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

//@route    POST api/waterTowers
//@desc     add waterTowers
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, budget, company, startDate, endDate } = req.body;
    try {
      WaterTower.findOne({ name: req.body.name }, (err, foundItem) => {
        if (!foundItem) {
          const newWaterTower = new WaterTower({
            id,
            name,
            budget,
            company,
            startDate,
            endDate,
          });
          newWaterTower.save((er, saved) => {
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

//@route    PUT api/waterTowers:id
//@desc     update waterTowers
//@access   Private
router.put("/:id", auth, (req, res) => {
  const { name, budget, company, startDate, endDate } = req.body;
  //building object
  const newWaterTower = {};
  name && (newWaterTower.name = name);
  budget && (newWaterTower.budget = budget);
  company && (newWaterTower.company = company);
  startDate && (newWaterTower.startDate = startDate);
  endDate && (newWaterTower.endDate = endDate);
  WaterTower.findOne({ name: newWaterTower.name }, (err, foundItem) => {
    if (foundItem) {
      if (foundItem.name === newWaterTower.name) {
        WaterTower.findOneAndUpdate(
          { id: req.params.id },
          { $set: newWaterTower },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "not found.." });
            }
          }
        ).catch((err) => console.log(err));
      } else {
        WaterTower.findOne({ name: newWaterTower.name }, (er, found) => {
          if (found) {
            res.json("0");
          } else {
            WaterTower.findOneAndUpdate(
              { id: req.params.id },
              { $set: newWaterTower },
              (err, doc) => {
                if (doc) {
                  res.json(doc);
                } else {
                  return res.status(404).json({ msg: "not found.." });
                }
              }
            ).catch((err) => console.log(err));
          }
        });
      }
    } else {
      res.json("No such Item");
    }
  });
});

//@route    PUT api/waterTowers/budget/update
//@desc     update budget
//@access   Private

router.put("/budget/update", auth, (req, res) => {
  const { id, amount } = req.body;

  WaterTower.findOneAndUpdate(
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

//@route    PUT api/waterTowers/bstate/update
//@desc     update bstate
//@access   Private

router.put("/bstate/update", auth, (req, res) => {
  const { name, state } = req.body;

  WaterTower.findOneAndUpdate(
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

//@route    PUT api/waterTowers/companyName/update
//@desc     update company name
//@access   Private

router.put("/companyName/update", auth, (req, res) => {
  const { watertowers, name } = req.body;
  watertowers.forEach((item) => {
    WaterTower.findOneAndUpdate(
      { id: item },
      { $set: { company: name } }
    ).catch((err) => console.log(err));
  });
  res.json("succesfully updated company name");
});

//@route    PUT api/waterTowers/prb/update
//@desc     update the prb
//@access   Private

router.put("/prb/update", auth, (req, res) => {
  const { name, val } = req.body;
  WaterTower.findOneAndUpdate(
    { name: name },
    { $set: { currentStep: val } }
  ).catch((err) => console.log(err));
  res.json("succesfully updated company name");
});

//@route    DELETE api/waterTowers:id
//@desc     delete waterTowers
//@access   Private
router.delete("/:id", auth, (req, res) => {
  WaterTower.findOneAndRemove({ id: req.params.id }, (err, deletedItem) => {
    if (deletedItem) {
      res.json({ msg: `successfully deleted ${deletedItem.name}` });
    } else {
      res.json({ msg: "No such item" });
    }
  });
});
module.exports = router;
