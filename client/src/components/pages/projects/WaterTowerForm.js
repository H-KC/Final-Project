import React, { useState, useContext, useEffect } from "react";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import CompanyContext from "../../../context/companies/companyContext";
import toast from "react-hot-toast";
import ExpenseContext from "../../../context/expenses/expenseContext";

const WaterTowerForm = () => {
  // init companies context
  const companyContext = useContext(CompanyContext);
  const { companies } = companyContext;
  // init watertower context
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers, addWaterTower, current, updateWaterTower } =
    waterTowerContext;
  //expense context
  const expenseContext = useContext(ExpenseContext);
  const { updateProjectName } = expenseContext;

  const [watertower, setWaterTower] = useState({
    id: v4(),
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
    type: "watertower",
    currentStep: 0,
    bstate: "new",
  });

  const { name, budget, company, startDate, endDate, period } = watertower;

  const handleChange = (e) => {
    if (
      [e.target.name] == "year" ||
      [e.target.name] == "month" ||
      [e.target.name] == "day"
    ) {
      setWaterTower({
        ...watertower,
        period: { ...period, [e.target.name]: e.target.value },
        // need to fix the period prop
        // endDate: setEndDate(startDate, e.target.value),
      });
    } else if (e.target.name === "budget") {
      if (isNaN(e.target.value)) {
        setWaterTower({
          ...watertower,
          [e.target.name]: 0,
        });
      } else {
        setWaterTower({
          ...watertower,
          [e.target.name]: Number(e.target.value),
        });
      }
    } else {
      setWaterTower({
        ...watertower,
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
        addWaterTower(watertower);
      } else {
        updateWaterTower(watertower);
        updateProjectName(watertower.id, watertower.name);
      }
    }
  };

  useEffect(() => {
    if (current !== null) {
      setWaterTower({ ...current, period });
    } else {
      setWaterTower({
        id: v4(),
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
        type: "watertower",
        bstate: "new",
        currentStep: 0,
      });
    }
  }, [current, waterTowerContext]);

  return (
    <form className='form-inline' onSubmit={handleSubmit}>
      {/* Alert Message */}
      <div className='alert alert-info' role='alert'>
        WaterTower
      </div>
      {/* Budget and name  */}
      <div className='row'>
        <div className='col-md-6 mb-3'>
          <label>WaterTower name</label>
          <input
            type='text'
            className='form-control'
            id='firstNamek'
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
          required
        >
          <option defaultValue key='hkcs'>
            Choose a company..
          </option>
          {companies.map((company, index) => {
            return (
              <option value={company.name} key={index + 8}>
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
                value={period.year}
                name='year'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-4'>
              <input
                type='tex'
                className='form-control'
                placeholder='MM'
                value={period.month}
                name='month'
                onChange={handleChange}
              />
            </div>
            <div className='col-lg-4'>
              <input
                type='tex'
                className='form-control'
                placeholder='DD'
                value={period.day}
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

const setEndDate = (st, obj) => {
  let [year, month, day] = st.split("-");
  let fyear = year + obj.year || 0;
  let fmonth = month + obj.month || 0;
  let fday = day + obj.day || 0;

  // return new Date(fyear + "-" + fmonth + "-" + fday).parse();
};
export default WaterTowerForm;

const v4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
