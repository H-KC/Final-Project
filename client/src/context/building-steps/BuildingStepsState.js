import BuildingtStepsContext from "./buildingtStepsContext";
import BuildingStepsReducer from "./buildingStepsReducer";
import {
  ADD_BUILDING_STEPS,
  UPDATE_BUILDING_STEPS,
  GET_BUILDING_STEPS,
} from "../types";
import { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const BuildingStepsState = (props) => {
  const initialState = {
    buildingSteps: [],
    current: null,
    ini: true,
  };

  const [state, dispatch] = useReducer(BuildingStepsReducer, initialState);

  //get all building steps
  const getBuildingSteps = async () => {
    try {
      const res = await axios.get("/api/buildingSteps");
      dispatch({ type: GET_BUILDING_STEPS, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
    }
  };
  if (state.ini) {
    getBuildingSteps();
    state.ini = false;
  }
  //add building steps
  const addBuildingSteps = async (steps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/buildingSteps", steps, config);
      dispatch({
        type: ADD_BUILDING_STEPS,
        payload: res.data,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //UPDATE BUILDING STEPS
  const updateBuildingSteps = async (id, index) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: UPDATE_BUILDING_STEPS, payload: { id, index } });
    try {
      const res = await axios.put("/api/buildingSteps", { id, index }, config);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <BuildingtStepsContext.Provider
      value={{
        addBuildingSteps,
        updateBuildingSteps,
        getBuildingSteps,
        buildingSteps: state.buildingSteps,
      }}
    >
      {props.children}
    </BuildingtStepsContext.Provider>
  );
};
export default BuildingStepsState;
