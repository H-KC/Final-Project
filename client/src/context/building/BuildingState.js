import { useReducer } from "react";
import BuildingContext from "./buildingContext";
import BuildingReducer from "./buildingReducer";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ADD_BUILDING,
  DELETE_BUILDING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BUILDING,
  UPDATE_COMPANY_NAME,
  UPDATE_BUDGET,
  UPDATE_BSTATE,
  UPDATE_PRB,
  GET_BUILDINGS,
} from "../types";

const BuildingState = (props) => {
  const initialState = {
    buildings: [],
    current: null,
    ini: true,
  };

  const [state, dispatch] = useReducer(BuildingReducer, initialState);

  //get all buildings
  const getBuildings = async () => {
    try {
      const res = await axios.get("/api/buildings");
      dispatch({ type: GET_BUILDINGS, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
    }
  };

  if (state.ini) {
    getBuildings();
    state.ini = false;
  }
  //add Building ok
  const addBuilding = async (building) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/buildings", building, config);
      if (res.data === "0") {
        toast.error("Building already exists");
      } else {
        dispatch({ type: ADD_BUILDING, payload: res.data });
        toast.success("Succefully added");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //delete building ok
  const deleteBuilding = async (id) => {
    try {
      await axios.delete(`/api/buildings/${id}`);
      dispatch({ type: DELETE_BUILDING, payload: id });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //udpdate building ok
  const updateBuilding = async (building) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/buildings/${building.id}`,
        building,
        config
      );
      if (res.data === "0") {
        toast.error("Building already exists");
        dispatch({ type: CLEAR_CURRENT });
      } else {
        dispatch({ type: UPDATE_BUILDING, payload: building });
        toast.success("Successfully updated!");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  // set cuurent or update building
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
        `/api/buildings/budget/update`,
        { id, amount },
        config
      );
      dispatch({
        type: UPDATE_BUDGET,
        payload: { id, amount },
      });
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
        `/api/buildings/bstate/update`,
        { name, state },
        config
      );
      dispatch({
        type: UPDATE_BSTATE,
        payload: { name, state },
      });
      toast.success("Successfully updated to " + state);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //udpate company name in buildings ok
  const updateCompanyName = async (buildings, name) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/buildings/companyName/update`,
        { buildings, name },
        config
      );
      dispatch({ type: UPDATE_COMPANY_NAME, payload: { buildings, name } });
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
    try {
      const res = await axios.put(
        `/api/buildings/prb/update`,
        { name, val },
        config
      );
      dispatch({
        type: UPDATE_PRB,
        payload: { name, val },
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //clear current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  return (
    <BuildingContext.Provider
      value={{
        buildings: state.buildings,
        current: state.current,
        getBuildings,
        addBuilding,
        deleteBuilding,
        setCurrent,
        clearCurrent,
        updateBuilding,
        updateCompanyName,
        updateBudget,
        updateBstate,
        updatePrb,
      }}
    >
      {props.children}
    </BuildingContext.Provider>
  );
};
export default BuildingState;
