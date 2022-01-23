const express = require("express");
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator");
const router = express.Router();
const BuildingStep = require("../models/BuildingStep");

//@route    GET api/buildingSteps
//@desc     Get all users buildingSteps
//@access   Private
router.get("/", auth, (req, res) => {
  BuildingStep.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.json([]);
    }
  }).sort({ date: -1 });
});

//@route    POST api/buildingSteps
//@desc     add buildingSteps
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("stepsID", "Name is required").not().isEmpty(),
      check("building", "Company is required").not().isEmpty(),
      check("step1", "step1 is required").not().isEmpty(),
      check("step2", "step2 is required").not().isEmpty(),
      check("step3", "step3 is required").not().isEmpty(),
      check("step4", "step4 is required").not().isEmpty(),
      check("step5", "step5 is required").not().isEmpty(),
      check("step6", "step6 is required").not().isEmpty(),
      check("step7", "step7 is required").not().isEmpty(),
      check("step8", "step8 is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      stepsID,
      building,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
    } = req.body;

    try {
      BuildingStep.findOne({ stepsID: req.body.stepsID }, (err, foundItem) => {
        if (!foundItem) {
          const newBuildingStep = new BuildingStep({
            stepsID,
            building,
            step1,
            step2,
            step3,
            step4,
            step5,
            step6,
            step7,
            step8,
          });
          newBuildingStep.save((er, saved) => {
            if (saved) {
              res.json(saved);
            }
          });
        } else {
          res.json("BuildingStep already exists");
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Problem ...");
    }
  }
);

//@route    PUT api/buildingSteps
//@desc     update buildingSteps
//@access   Private
router.put("/", (req, res) => {
  const { id, index } = req.body;
  const today = new Date().toJSON().slice(0, 10);
  BuildingStep.findOne({ stepsID: id }, (err, foundItem) => {
    if (index === "1") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "2") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "3") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "4") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "5") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "6") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "7") {
      BuildingStep.findOneAndUpdate(
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
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    } else if (index === "8") {
      BuildingStep.findOneAndUpdate(
        { stepsID: id },
        { $set: { step8: { ...foundItem.step8, state: "valid" } } },
        (err, doc) => {
          if (doc) {
            res.json("succesfully updated");
          } else {
            return res.status(404).json({ msg: "item not found" });
          }
        }
      ).catch((err) => console.log(err));
    }
  });
});

//@route    DELETE api/buildingSteps:id
//@desc     delete buildingSteps
//@access   Private
router.delete("/:id", auth, (req, res) => {
  res.send("delete buildingSteps");
});
module.exports = router;
