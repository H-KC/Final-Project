import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  CLEAR_CURRENT,
  SET_CURRENT,
  GET_USERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(({ _id }) => _id !== action.payload),
        current: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          } else {
            return user;
          }
        }),
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
