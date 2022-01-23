import { Fragment, useState, useContext, useEffect, Paragraph } from "react";
import BuildingContext from "../../../context/building/buildingContext";
import CompanyContext from "../../../context/companies/companyContext";
import WaterTowerContext from "../../../context/waterTower/waterTowerContext";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const FormCompnies = () => {
  //company context
  const companyContext = useContext(CompanyContext);
  const { addCompany, companies, current, updateCompany } = companyContext;
  //building context
  const buildingContext = useContext(BuildingContext);
  const { updateCompanyName } = buildingContext;

  // waterTower context
  const waterTowerContext = useContext(WaterTowerContext);

  const [company, setCompany] = useState({
    id: uuidv4(),
    name: "",
    description: "",
    creationDate: new Date().toJSON().slice(0, 10),
    newProjects: 0,
    pausedProjects: 0,
    finishedProjects: 0,
    inProgessProjects: 0,
    buildingsID: [],
    waterTowerID: [],
  });
  const { name, description } = company;
  //handle change
  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (current !== null) {
      setCompany(current);
      toast.success("Company is in update", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } else {
      setCompany({
        id: uuidv4(),
        name: "",
        description: "",
        creationDate: new Date().toJSON().slice(0, 10),
        newProjects: 0,
        pausedProjects: 0,
        finishedProjects: 0,
        inProgessProjects: 0,
        buildingsID: [],
        waterTowerID: [],
      });
    }
  }, [current, companyContext]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || description.trim() === "") {
      toast.error("Name ,Description can't be Empty");
    } else {
      if (current === null) {
        addCompany(company);
      } else {
        updateCompany(company);
        updateCompanyName(company.buildingsID, company.name);
        waterTowerContext.updateCompanyName(company.waterTowerID, company.name);
      }
    }
  };
  return (
    <div key='other'>
      <div className='card p-2'>
        <div className='alert alert-primary' role='alert'>
          ADD COMPANY
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group p-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              placeholder='Name of the company'
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group p-1'>
            <label htmlFor='desc'>Description</label>
            <input
              value={description}
              type='text'
              className='form-control'
              name='description'
              placeholder='Description here ...'
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className='btn btn-primary btn-block'>
            {!current ? "ADD" : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCompnies;
