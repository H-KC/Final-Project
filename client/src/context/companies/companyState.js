import { useReducer } from "react";
import CompanyContext from "./companyContext";
import CompanyReducer from "./companyReducer";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_COMPANIES,
} from "../types";

const CompanyState = (props) => {
  const initialState = {
    companies: [],
    current: null,
    ini: true,
  };

  const [state, dispatch] = useReducer(CompanyReducer, initialState);

  //get all companies
  const getCompanies = async () => {
    try {
      const res = await axios.get("/api/companies");
      dispatch({ type: GET_COMPANIES, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
    }
  };
  if (state.ini) {
    getCompanies();
    state.ini = false;
  }
  //add Company ok
  const addCompany = async (company) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/companies", company, config);
      if (res.data === "0") {
        toast.error("Company Already Exist");
        dispatch({
          type: CLEAR_CURRENT,
        });
      } else {
        dispatch({
          type: ADD_COMPANY,
          payload: res.data,
        });
        toast.success("Successfully added!");
      }
    } catch (err) {
      console.log("ok");
      toast.error(err.response.data.msg);
    }
  };

  //delete company ok
  const deleteCompany = async (id) => {
    try {
      await axios.delete(`/api/companies/${id}`);
      dispatch({ type: DELETE_COMPANY, payload: id });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //udpdate company ok
  const updateCompany = async (company) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/companies/${company.id}`,
        company,
        config
      );
      if (res.data === "0") {
        toast.error("Company Already exists");
        dispatch({ type: CLEAR_CURRENT });
      } else {
        dispatch({ type: UPDATE_COMPANY, payload: company });
        toast.success("Successfully updated!");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const setStats = async (holder) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/companies/state/update`,
        holder,
        config
      );
      if (res.data === "0") {
        toast.error("Company Already exists");
        dispatch({ type: CLEAR_CURRENT });
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // set cuurent or update company
  const setCurrent = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };

  //clear current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  return (
    <CompanyContext.Provider
      value={{
        companies: state.companies,
        current: state.current,
        addCompany,
        deleteCompany,
        setCurrent,
        clearCurrent,
        updateCompany,
        getCompanies,
        setStats,
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};
export default CompanyState;
