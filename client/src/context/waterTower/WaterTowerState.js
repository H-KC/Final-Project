import { useReducer } from "react";
import WaterTowerContext from "./waterTowerContext";
import WaterTowerReducer from "./waterTowerReducer";
import axios from "axios";
import toast from "react-hot-toast";

import {
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_WATERTOWER,
  DELETE_WATERTOWER,
  UPDATE_WATERTOWER,
  UPDATE_COMPANY_NAME,
  UPDATE_BUDGET,
  UPDATE_BSTATE,
  UPDATE_PRB,
  GET_WATERTOWERS,
} from "../types";

const WaterTowerState = (props) => {
  const initialState = {
    watertowers: [],
    current: null,
    ini: true,
  };

  const [state, dispatch] = useReducer(WaterTowerReducer, initialState);
  //get all watertowers
  const getWaterTowers = async () => {
    try {
      const res = await axios.get("/api/waterTowers");
      dispatch({ type: GET_WATERTOWERS, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
    }
  };
  if (state.ini) {
    getWaterTowers();
    state.ini = false;
  }

  //add WaterTower ok
  const addWaterTower = async (waterTower) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/waterTowers", waterTower, config);
      if (res.data === "0") {
        toast.error("WaterTower Already Exist");
      } else {
        dispatch({
          type: ADD_WATERTOWER,
          payload: res.data,
        });
        toast.success("Successfully Added!");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //delete WaterTower ok
  const deleteWaterTower = async (id) => {
    try {
      await axios.delete(`/api/waterTowers/${id}`);
      dispatch({ type: DELETE_WATERTOWER, payload: id });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //udpdate water tower ok
  const updateWaterTower = async (waterTower) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/waterTowers/${waterTower.id}`,
        waterTower,
        config
      );
      if (res.data === "0") {
        toast.error("WaterTower Already Exist");
        dispatch({ type: CLEAR_CURRENT });
      } else {
        dispatch({ type: UPDATE_WATERTOWER, payload: waterTower });
        toast.success("Successfully updated!");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // set cuurent or WaterTower
  const setCurrent = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };

  //update budget ok
  const updateBudget = async (id, amount) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/waterTowers/budget/update`,
        { id, amount },
        config
      );
      dispatch({
        type: UPDATE_BUDGET,
        payload: { id, amount },
      });
      toast.success("Successfully updated the budget!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //update building state ok
  const updateBstate = async (name, state) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/waterTowers/bstate/update`,
        { name, state },
        config
      );
      dispatch({
        type: UPDATE_BSTATE,
        payload: { name, state },
      });
      toast.success("Successfully updated the bstate!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //udpate company name in watertowers ok
  const updateCompanyName = async (watertowers, name) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/waterTowers/companyName/update`,
        { watertowers, name },
        config
      );
      dispatch({ type: UPDATE_COMPANY_NAME, payload: { watertowers, name } });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //update prb ok
  const updatePrb = async (name, val) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { name, val };
    try {
      const res = await axios.put(`/api/waterTowers/prb/update`, data, config);
      dispatch({
        type: UPDATE_PRB,
        payload: data,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //clear current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  return (
    <WaterTowerContext.Provider
      value={{
        watertowers: state.watertowers,
        current: state.current,
        getWaterTowers,
        addWaterTower,
        deleteWaterTower,
        updateWaterTower,
        setCurrent,
        clearCurrent,
        updateCompanyName,
        updateBudget,
        updateBstate,
        updatePrb,
      }}
    >
      {props.children}
    </WaterTowerContext.Provider>
  );
};
export default WaterTowerState;
