import React, { useState, useContext, useEffect } from "react";
import BuildingContext from "../../../context/building/buildingContext";
import CompanyContext from "../../../context/companies/companyContext";
import ExpenseContext from "../../../context/expenses/expenseContext";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const ProjectForm = () => {
  //company context
  const companyContext = useContext(CompanyContext);
  const { companies } = companyContext;
  //expense context
  const expenseContext = useContext(ExpenseContext);
  const { updateProjectName } = expenseContext;

  // init building context
  const buildingContext = useContext(BuildingContext);
  const { addBuilding, current, updateBuilding } = buildingContext;

  const [building, setBuilding] = useState({
    id: uuidv4(),
    name: "",
    budget: 0,
    company: "",
    startDate: "",
    endDate: "",
    period: {
      year: "",
      month: "",
      day: "",
    },
    type: "building",
    bstate: "new",
    currentStep: 0,
  });

  const { name, budget, company, startDate, endDate, period } = building;

  const handleChange = (e) => {
    // if (
    //   e.target.name === "year" ||
    //   e.target.name === "month" ||
    //   e.target.name === "day"
    // ) {
    // if (startDate && !isNaN(e.target.value)) {
    //   let a = new Date(startDate);
    //   let days =
    //     Number(period.day) +
    //     Number(period.month * 30) +
    //     Number(period.year * 365);
    //   a.setDate(a.getDate() + days);
    //   setBuilding({
    //     ...building,
    //     endDate: a.toJSON().slice(0, 10),
    //     period: { ...period, [e.target.name]: Number(e.target.value) },
    //   });
    // }
    // } else
    if (e.target.name === "budget") {
      if (isNaN(e.target.value)) {
        setBuilding({
          ...building,
          [e.target.name]: 0,
        });
      } else {
        setBuilding({
          ...building,
          [e.target.name]: Number(e.target.value),
        });
      }
    } else {
      setBuilding({
        ...building,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (company === "" || name.trim() === "") {
      toast.error("Please fill in all fields");
    } else {
      if (!current) {
        addBuilding(building);
      } else {
        updateBuilding(building);
        updateProjectName(building.id, building.name);
      }
    }
  };

  useEffect(() => {
    if (current !== null) {
      setBuilding({ ...current, period });
    } else {
      setBuilding({
        id: uuidv4(),
        name: "",
        budget: 0,
        company: "",
        startDate: "",
        endDate: "",
        period: {
          year: "",
          month: "",
          day: "",
        },
        type: "building",
        bstate: "new",
        currentStep: 0,
      });
    }
  }, [current, buildingContext]);

  return (
    <form className='form-inline' onSubmit={handleSubmit}>
      {/* Alert Message */}
      <div className='alert alert-primary' role='alert'>
        Building
      </div>

      {/* Budget and name  */}
      <div className='row'>
        <div className='col-md-6 mb-3'>
          <label>Building name</label>
          <input
            type='text'
            className='form-control'
            placeholder=''
            value={name}
            required
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-6 mb-3'>
          <label>Budget</label>
          <input
            type='text'
            className='form-control'
            placeholder=''
            value={budget}
            required
            name='budget'
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Companies List */}
      <div className='row mb-3 col-lg-12  '>
        <label className='my-1 '>Company</label>
        <select
          name='company'
          className='custom-select py-3 mx-2 '
          value={company}
          onChange={handleChange}
        >
          <option defaultValue key='hkcd'>
            Choose a company..
          </option>
          {companies.map((company, index) => {
            return (
              <option value={company.name} key={index + 7}>
                {company.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* Date start end period */}
      <div className='row '>
        <div className='col-md-4 mb-3'>
          <label>Start Date</label>
          <input
            type='date'
            className='form-control'
            name='startDate'
            placeholder=''
            value={startDate}
            required
            onChange={handleChange}
          />
        </div>
        <div className='col-md-4 mb-3 '>
          <label>You can Set The Period</label>
          <div className='row'>
            <div className='col-lg-4'>
              <input
                type='tex'
                className='form-control'
                placeholder='YY'
                // value={period.year}
                name='year'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-4'>
              <input
                type='tex'
                className='form-control'
                placeholder='MM'
                // value={period.month}
                name='month'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-4'>
              <input
                type='tex'
                className='form-control'
                placeholder='DD'
                // value={period.day}
                name='day'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-3'>
          <label>End Date</label>
          <input
            type='date'
            className='form-control'
            placeholder=''
            value={endDate}
            required
            name='endDate'
            min={startDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Button submit */}
      <div className='d-grid mb-2'>
        <button type='submit' className='btn btn-primary '>
          {!current ? "Submit" : "Update"}
        </button>
      </div>
    </form>
  );
};

let addDays = function (date, days) {
  var datee = new Date(date);
  datee.setDate(date.getDate() + days);
  return datee;
};

export default ProjectForm;
