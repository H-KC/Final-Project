import React, { useContext, useState } from "react";
import BuildingContext from "../../../../context/building/buildingContext";
import WaterTowerContext from "../../../../context/waterTower/waterTowerContext";
import BuildingtStepsContext from "../../../../context/building-steps/buildingtStepsContext";
import WaterTowerStepsContext from "../../../../context/watertower-steps/waterTowerStepsContext";
import ExpenseContext from "../../../../context/expenses/expenseContext";
import MBsteps from "./MBsteps";
import "./personlaStyle.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MWsteps from "./MWsteps";
import Expenses from "./Expenses";
import exp from "./imgs/exp.svg";
import inf from "./imgs/inf.svg";
import ste from "./imgs/ste.svg";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const Manager = () => {
  const classes = useStyles();

  //building context
  const buildingContext = useContext(BuildingContext);
  const { buildings, updateBstate } = buildingContext;
  //building steps context
  const buildingtStepsContext = useContext(BuildingtStepsContext);
  const { buildingSteps, updateBuildingSteps } = buildingtStepsContext;
  //watetower context
  const waterTowerContext = useContext(WaterTowerContext);
  const { watertowers, updatePrb } = waterTowerContext;
  //watetower steps context
  const waterTowerStepsContext = useContext(WaterTowerStepsContext);
  const { waterTowerSteps, updateWateTowerSteps } = waterTowerStepsContext;
  //expense context
  const expenseContext = useContext(ExpenseContext);
  const { expenses } = expenseContext;

  const [state, setState] = useState({
    projectitem: "",
    projectInfo: "",
    projectExpenses: "",
    selected: "",
    type: "",
  });
  const { projectitem, selected, type, projectInfo, projectExpenses } = state;

  //init all projects
  const projects = buildings
    .filter((project) => project.bstate !== "new")
    .map((project) => project)
    .concat(
      watertowers
        .filter((project) => project.bstate !== "new")
        .map((project) => project)
    );

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const getData = () => {
    if (projectitem) {
      let holder = projects
        .filter((item) => item.id === projectitem)
        .map((item) => item)[0];
      const projectExpensesh = expenses
        .filter((item) => item.projectid === projectitem)
        .map((item) => item);

      if (holder.type === "watertower") {
        const steps = waterTowerSteps
          .filter((item) => item.waterTower === holder.name)
          .map((item) => item)[0];
        setState({
          ...state,
          selected: steps,
          type: "watertower",
          projectInfo: holder,
          projectExpenses: projectExpensesh,
        });
      } else {
        const steps = buildingSteps
          .filter((item) => item.building === holder.name)
          .map((item) => item)[0];
        setState({
          ...state,
          selected: steps,
          type: "building",
          projectInfo: holder,
          projectExpenses: projectExpensesh,
        });
      }
    } else {
      toast.error("Select a project");
    }
  };

  return (
    <div className='row ' style={{ height: "100%" }}>
      <div className='row col-lg-12'>
        {/* //serach input */}
        <div className='col-lg-4 d-flex justify-content-center'>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='grouped-select'>Projects</InputLabel>
            <Select
              defaultValue=''
              id='grouped-select'
              name='projectitem'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <ListSubheader>Buldings</ListSubheader>
              {buildings
                .filter((item) => item.bstate !== "new")
                .map((building) => {
                  return (
                    <MenuItem value={building.id} key={building.id}>
                      {building.name}
                    </MenuItem>
                  );
                })}

              <ListSubheader>WaterTowers</ListSubheader>
              {watertowers
                .filter((item) => item.bstate !== "new")
                .map((watertower) => {
                  return (
                    <MenuItem value={watertower.id} key={watertower.id}>
                      {watertower.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <button
            type='button'
            className='btn btn-success mt-4'
            onClick={getData}
          >
            Get
          </button>
        </div>
        <div
          className='col-lg-8 p-1'
          style={{
            backgroundColor: "#3F51B5",
            color: "#fcfdff",
            textAlign: "center",
            borderRadius: "1%",
          }}
        >
          <h1> PROJECT INFORMATIONS</h1>
        </div>
      </div>
      {/* info */}

      <div className='col-lg-4 mt-3'>
        {projectInfo ? (
          <div className='card  bg-light m '>
            <div className='card-header text-center'>
              <h2>{projectInfo.name}</h2>
            </div>
            <div className='card-body'>
              <div className=' d-flex card-title'>
                <h5
                  className='btn btn-primary btn-md'
                  style={{
                    width: "110px",
                  }}
                >
                  Start Date :{" "}
                </h5>
                <h5
                  style={{
                    marginLeft: "auto",
                    width: "110px",
                  }}
                  className='btn btn-success btn-md'
                >
                  {projectInfo.startDate}
                </h5>
              </div>
              <div className='dropdown-divider'></div>
              <div className=' d-flex card-title'>
                <h5
                  className='btn btn-primary btn-md'
                  style={{
                    width: "110px",
                  }}
                >
                  End Date :{" "}
                </h5>
                <h5
                  className='btn btn-success btn-md'
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {projectInfo.endDate}
                </h5>
              </div>

              <div className='dropdown-divider'></div>
              <div className=' d-flex card-title'>
                <h5
                  className='btn btn-primary btn-md'
                  style={{
                    width: "110px",
                  }}
                >
                  Budget :{" "}
                </h5>
                <h5
                  className='btn btn-success btn-md'
                  style={{
                    marginLeft: "auto",
                    width: "110px",
                  }}
                >
                  {projectInfo.budget}
                </h5>
              </div>
              <div className='dropdown-divider'></div>
              <div className=' d-flex card-title'>
                <h5
                  className='btn btn-primary btn-md'
                  style={{
                    width: "110px",
                  }}
                >
                  Company :{" "}
                </h5>
                <h5
                  className='btn btn-success btn-md'
                  style={{
                    marginLeft: "auto",
                    width: "110px",
                  }}
                >
                  {projectInfo.company}
                </h5>
              </div>

              <div className='dropdown-divider'></div>
              <div className=' d-flex card-title'>
                <h5
                  className='btn btn-success btn-md'
                  style={{
                    width: "420px",
                  }}
                >
                  State : {projectInfo.bstate}
                </h5>
              </div>
            </div>
          </div>
        ) : (
          <img
            src={inf}
            alt='expenses'
            style={{ width: 300, marginLeft: 80, marginTop: 45 }}
          />
        )}
      </div>
      {/* steps */}
      <div className='col-lg-4'>
        <div className='container m-3'>
          {type === "building" ? (
            <MBsteps
              steps={selected}
              updateBuildingSteps={updateBuildingSteps}
              updateBstate={updateBstate}
              updatePrb={buildingContext.updatePrb}
            />
          ) : type === "watertower" ? (
            <MWsteps
              steps={selected}
              updateWateTowerSteps={updateWateTowerSteps}
              updateBstate={waterTowerContext.updateBstate}
              updatePrb={updatePrb}
            />
          ) : (
            <img
              src={ste}
              alt='expenses'
              style={{ width: 300, marginTop: 23 }}
            />
          )}
        </div>
      </div>
      {/* expense */}
      <div className='col-lg-4 mt-3'>
        {projectExpenses.length > 0 ? (
          <Expenses expenses={projectExpenses} />
        ) : (
          <img src={exp} alt='expenses' style={{ width: 300 }} />
        )}
      </div>
      {/* progresbar */}
      {projectInfo && (
        <div className='col-lg-12 mt-3 mb-3'>
          <div className='progress'>
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              style={{ width: projectInfo.currentStep }}
              aria-valuenow='10'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              {projectInfo.currentStep}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;
