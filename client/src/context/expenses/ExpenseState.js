import { useReducer } from "react";
import ExpenseContext from "./expenseContext";
import ExpenseReducer from "./expenseReducer";
import axios from "axios";
import toast from "react-hot-toast";
import {
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_EXPENSE_PROJECT_NAME,
  GET_EXPENSES,
} from "../types";

const ExpenseState = (props) => {
  const initialState = {
    expenses: [],
    current: null,
    ini: true,
  };

  const [state, dispatch] = useReducer(ExpenseReducer, initialState);

  //get expenses
  const getExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses");
      dispatch({ type: GET_EXPENSES, payload: res.data });
    } catch (err) {
      // toast.error(err.response.data.msg);
    }
  };
  if (state.ini) {
    getExpenses();
    state.ini = false;
  }
  //add expense ok
  const addExpense = async (expnese) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/expenses", expnese, config);
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
      toast.success("Successfully added!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //delete expnese ok
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      dispatch({ type: DELETE_EXPENSE, payload: id });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //udpdate company ok
  const updateExpense = async (expnese) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/expenses/${expnese.id}`,
        expnese,
        config
      );
      dispatch({ type: UPDATE_EXPENSE, payload: expnese });
      toast.success("Successfully updated!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // update project name
  const updateProjectName = async (id, newName) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/expenses/projectName/update`,
        { id, newName },
        config
      );

      dispatch({
        type: UPDATE_EXPENSE_PROJECT_NAME,
        payload: { id, newName },
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // set cuurent or update expnese
  const setCurrent = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };
  //clear current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        current: state.current,
        getExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
        setCurrent,
        clearCurrent,
        updateProjectName,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseState;
