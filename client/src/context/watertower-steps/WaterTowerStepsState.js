import WaterTowerStepsContext from "./waterTowerStepsContext";
import WaterTowerStepsReducer from "./waterTowerStepsReducer";
import {
  ADD_WATERTOWER_STEPS,
  UPDATE_WATERTOWER_STEPS,
  GET_WATERTOWER_STEPS,
} from "../types";
import { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const WaterTowerStepsState = (props) => {
  const initialState = {
    waterTowerSteps: [],
    ini: true,
  };

  const [state, dispatch] = useReducer(WaterTowerStepsReducer, initialState);

  //get all water tower steps
  const getWaterTowersSteps = async () => {
    try {
      const res = await axios.get("/api/waterTowerStpes");
      dispatch({ type: GET_WATERTOWER_STEPS, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
      // console.log(err.message);
    }
  };
  if (state.ini) {
    getWaterTowersSteps();
    state.ini = false;
  }

  //add watertower steps
  const addWaterTowerSteps = async (steps) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/waterTowerStpes", steps, config);

      dispatch({
        type: ADD_WATERTOWER_STEPS,
        payload: res.data,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //UPDATE WATERTOWER STEPS
  const updateWateTowerSteps = async (id, index) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { id, index };
    try {
      const res = await axios.put("/api/waterTowerStpes", data, config);

      dispatch({ type: UPDATE_WATERTOWER_STEPS, payload: data });
    } catch (err) {
      // toast.error(err.response.data.msg);
      console.log("err in wt steps");
    }
  };
  return (
    <WaterTowerStepsContext.Provider
      value={{
        addWaterTowerSteps,
        updateWateTowerSteps,
        getWaterTowersSteps,
        waterTowerSteps: state.waterTowerSteps,
      }}
    >
      {props.children}
    </WaterTowerStepsContext.Provider>
  );
};
export default WaterTowerStepsState;
