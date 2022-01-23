import React, { Fragment, useState, useContext } from "react";
import BuildingContext from "../../../context/building/buildingContext";
import ExpenseContext from "../../../context/expenses/expenseContext";
import toast from "react-hot-toast";

const DForm = () => {
  //building context
  const buildingContext = useContext(BuildingContext);
  const { buildings, updateBudget } = buildingContext;
  //expense context
  const expenseContext = useContext(ExpenseContext);
  const { addExpense } = expenseContext;
  const [expense, setExpense] = useState({
    id: v4(),
    amount: 0,
    description: "",
    projectName: "",
    projectid: "",
    date: new Date().toJSON().slice(0, 10),
    type: "Building",
    budget: 0, //just indicator
    result: 0, //just indicator
  });
  const { amount, description, projectName, budget } = expense;

  //get company budget
  const getBuildingbudget = (name) => {
    let holder = buildings.filter((building) => building.name === name);
    if (holder[0]) {
      let newBudget = Number(holder[0].budget);
      let id = holder[0].id;
      return { newBudget, id };
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "amount") {
      if (isNaN(e.target.value)) {
        setExpense({
          ...expense,
          result: budget - amount,

          [e.target.name]: 0,
        });
      } else {
        setExpense({
          ...expense,
          result: budget - amount,

          [e.target.name]: Number(e.target.value),
        });
      }
    } else if (e.target.name === "projectName" && e.target.value !== "") {
      const { newBudget, id } = getBuildingbudget(e.target.value);
      let res = Number(amount) && newBudget - Number(amount);
      setExpense({
        ...expense,
        budget: newBudget,
        projectid: id,
        res: newBudget - amount,
        result: newBudget - amount,
        [e.target.name]: e.target.value,
      });
    } else {
      setExpense({
        ...expense,
        res: budget - amount,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName === "" || amount === "" || description.trim() === "") {
      toast.error("Please fill in all fields");
    } else if (budget - amount < 0) {
      toast.error("Sorry out of Budget");
    } else {
      addExpense(expense);
      updateBudget(expense.projectid, Number(budget) - expense.amount);
      setExpense({
        id: v4(),
        amount: 0,
        description: "",
        projectName: "",
        projectid: "",
        date: new Date().toJSON().slice(0, 10),
        type: "Building",
        result: 0, //just indicator
        budget: 0, //just indicator
      });
      toast.success("Successfully added!");
    }
  };
  return (
    <Fragment>
      <div className='card p-2'>
        <div className='alert alert-primary' role='alert'>
          Buildings Expenses
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group p-1'>
            <label htmlFor='amount'>AMOUNT :</label>
            <input
              type='text'
              className='form-control'
              id='amount'
              placeholder='Enter The Amount'
              name='amount'
              value={amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group p-1'>
            <label htmlFor='desc'>Description</label>
            <input
              type='text'
              className='form-control'
              id='desc'
              placeholder='description here ...'
              name='description'
              value={description}
              onChange={handleChange}
              required
            />
          </div>
          <div className='row mb-3 col-lg-12  '>
            <label className='my-1 '>Project Name</label>
            <select
              name='projectName'
              className='custom-select py-3 mx-2 '
              value={projectName}
              onChange={handleChange}
            >
              <option defaultValue value=''>
                Choose a building..
              </option>
              {buildings
                .filter(
                  (building) =>
                    building.bstate === "inProgress" ||
                    building.bstate === "paused"
                )
                .map((building) => {
                  return (
                    <option value={building.name} key={building.id}>
                      {building.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <button type='submit' className='btn btn-primary btn-block'>
            ADD EXPENSE
          </button>
        </form>
        <div className='row  '>
          <div className=' alert alert-primary col-lg-4 m-2 ' name='budget'>
            {projectName === "" ? "Budget : 0" : budget}
          </div>
          <div className='alert col-lg-4 m-2 alert-primary'>
            {amount === "" || amount === 0 ? "Amount : 0" : amount}
          </div>
          <div
            className={
              Number(amount) && Number(budget) && budget - amount < 0
                ? "alert col-lg-3 m-2 alert-danger"
                : "alert col-lg-3 m-2 alert-success"
            }
            name='result'
          >
            {amount === 0 || budget === 0 ? "Result : 0" : budget - amount}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DForm;

const v4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
