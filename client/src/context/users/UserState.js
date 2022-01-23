import { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  CLEAR_CURRENT,
  SET_CURRENT,
  GET_USERS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: [],
    current: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //get all users
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //add user
  const addUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", user, config);
      if (res.data === "0") {
        toast.error("User Already Exist");
        dispatch({
          type: CLEAR_CURRENT,
        });
      } else {
        dispatch({ type: ADD_USER, payload: res.data });
        toast.success("Successfully added!");
      }
    } catch (err) {
      toast.error("Check email or password");
    }
  };

  //delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
      toast.success("Successfully Deleted");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // update type
  const updateUser = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/users/${data.id}`, data, config);
      dispatch({ type: UPDATE_USER, payload: res.data });
      getUsers();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //   Logout
  const logOut = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/users/logout/${id}`, "", config);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  // set cuurent or update user
  const setCurrent = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };
  //clear current
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        logOut,
        getUsers,
        addUser,
        setCurrent,
        clearCurrent,
        deleteUser,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
