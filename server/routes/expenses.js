const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator");
const Expense = require("../models/Expense");
//@route    GET api/expenses
//@desc     Get all users expenses
//@access   Private
router.get("/", auth, (req, res) => {
  Expense.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

//@route    POST api/expenses
//@desc     add expenses
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("amount", "amount is required").not().isEmpty(),
      check("id", "id is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("projectName", "projectName is required").not().isEmpty(),
      check("projectid", "projectid is required").not().isEmpty(),
      check("type", "type is required").not().isEmpty(),
      check("result", "result is required").not().isEmpty(),
      check("budget", "budget is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      id,
      amount,
      description,
      projectName,
      projectid,
      type,
      result,
      budget,
      date,
    } = req.body;

    try {
      Expense.findOne({ id: req.body.id }, (err, foundItem) => {
        if (!foundItem) {
          const newExpense = new Expense({
            id,
            amount,
            description,
            projectName,
            projectid,
            type,
            result,
            budget,
            date,
          });
          newExpense.save((er, saved) => {
            if (saved) {
              res.json(saved);
            } else {
              console.log(er);
            }
          });
        } else {
          res.json("expense already exists");
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Problem ...");
    }
  }
);

//@route    PUT api/expenses:id
//@desc     update expenses
//@access   Private
router.put("/:id", (req, res) => {
  const {
    id,
    amount,
    description,
    projectName,
    projectid,
    type,
    result,
    budget,
    date,
  } = req.body;
  const newExpense = {};
  id && (newExpense.id = id);
  amount && (newExpense.amount = amount);
  description && (newExpense.description = description);
  projectName && (newExpense.projectName = projectName);
  projectid && (newExpense.projectid = projectid);
  type && (type = type);
  result && (newExpense.result = result);
  budget && (newExpense.budget = budget);
  date && (newExpense.date = date);

  Expense.findOneAndUpdate(
    { id: req.params.id },
    { $set: newExpense },
    (err, doc) => {
      if (doc) {
        res.json("succesfully updated");
      } else {
        return res.status(404).json({ msg: "not found.." });
      }
    }
  ).catch((err) => console.log(err));
});

//@route    PUT api/expenses/projectName/update
//@desc     update project Name in expenses
//@access   Private
router.put(
  "/projectName/update",
  [
    auth,
    [
      check("newName", "newName is required").not().isEmpty(),
      check("id", "id is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, newName } = req.body;

    Expense.updateMany(
      { projectid: id },
      { $set: { projectName: newName } },
      (err, doc) => {
        if (doc) {
          res.json("succesfully updated");
        } else {
          return res.status(404).json({ msg: "not found." });
        }
      }
    ).catch((err) => console.log(err));
  }
);

//@route    DELETE api/expenses:id
//@desc     delete expenses
//@access   Private
router.delete("/:id", auth, (req, res) => {
  Expense.findOneAndRemove({ id: req.params.id }, (err, deletedItem) => {
    if (deletedItem) {
      res.json({ msg: `successfully deleted ` });
    } else {
      res.json({ msg: "No such item" });
    }
  });
});
module.exports = router;
