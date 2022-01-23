const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator");
const WaterTowerStep = require("../models/WaterTowerStep");

//@route    GET api/waterTowerSteps
//@desc     Get all users waterTowerSteps
//@access   Private
router.get("/", auth, (req, res) => {
  WaterTowerStep.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.json([]);
    }
  }).sort({ date: -1 });
});

//@route    POST api/waterTowerSteps
//@desc     add waterTowerSteps
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("stepsID", "id is required").not().isEmpty(),
      check("waterTower", "waterTower is required").not().isEmpty(),
      check("step1", "step1 is required").not().isEmpty(),
      check("step2", "step2 is required").not().isEmpty(),
      check("step3", "step3 is required").not().isEmpty(),
      check("step4", "step4 is required").not().isEmpty(),
      check("step5", "step5 is required").not().isEmpty(),
      check("step6", "step6 is required").not().isEmpty(),
      check("step7", "step7 is required").not().isEmpty(),
      check("step8", "step8 is required").not().isEmpty(),
      check("step9", "step9 is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      stepsID,
      waterTower,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      step9,
    } = req.body;
    try {
      WaterTowerStep.findOne(
        { stepsID: req.body.stepsID },
        (err, foundItem) => {
          if (!foundItem) {
            const newWaterTowerStep = new WaterTowerStep({
              stepsID,
              waterTower,
              step1,
              step2,
              step3,
              step4,
              step5,
              step6,
              step7,
              step8,
              step9,
            });
            newWaterTowerStep.save((er, saved) => {
              if (saved) {
                res.json(saved);
              }
            });
          } else {
            res.json("watertowerstep already exists");
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server Problem ...");
    }
  }
);

//@route    PUT api/waterTowerSteps
//@desc     update waterTowerSteps
//@access   Private
router.put("/", auth, (req, res) => {
  const { id, index } = req.body;
  const today = new Date().toJSON().slice(0, 10);
  WaterTowerStep.findOne({ stepsID: id }, (err, foundItem) => {
    if (!err) {
      if (index === "1") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step1: { ...foundItem.step1, state: "valid" },
              step2: {
                ...foundItem.step2,
                state: foundItem.step2.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "2") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step2: { ...foundItem.step2, state: "valid" },
              step3: {
                ...foundItem.step3,
                state: foundItem.step3.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "3") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step3: { ...foundItem.step3, state: "valid" },
              step4: {
                ...foundItem.step4,
                state: foundItem.step4.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "4") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step4: { ...foundItem.step4, state: "valid" },
              step5: {
                ...foundItem.step5,
                state: foundItem.step5.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "5") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step5: { ...foundItem.step5, state: "valid" },
              step6: {
                ...foundItem.step6,
                state: foundItem.step6.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "6") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step6: { ...foundItem.step6, state: "valid" },
              step7: {
                ...foundItem.step7,
                state: foundItem.step7.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "7") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step7: { ...foundItem.step7, state: "valid" },
              step8: {
                ...foundItem.step8,
                state: foundItem.step8.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json(doc);
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "8") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step8: { ...foundItem.step8, state: "valid" },
              step9: {
                ...foundItem.step9,
                state: foundItem.step9.endDate < today ? "outdate" : "now",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json("succesfully updated");
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      } else if (index === "9") {
        WaterTowerStep.findOneAndUpdate(
          { stepsID: id },
          {
            $set: {
              step9: {
                ...foundItem.step9,
                state: "valid",
              },
            },
          },
          (err, doc) => {
            if (doc) {
              res.json("succesfully updated");
            } else {
              return res.status(404).json({ msg: "item not found" });
            }
          }
        ).catch((err) => console.log(err));
      }
    }
  });
});

//@route    DELETE api/waterTowerSteps:id
//@desc     delete waterTowerSteps
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("delete waterTowerSteps");
});
module.exports = router;
