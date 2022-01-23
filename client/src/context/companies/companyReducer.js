import {
  ADD_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_COMPANIES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(({ id }) => id !== action.payload),
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
    case UPDATE_COMPANY:
      return {
        ...state,
        companies: state.companies.map((company) => {
          if (company.id === action.payload.id) {
            return action.payload;
          } else {
            return company;
          }
        }),
        current: null,
      };

    default:
      return state;
  }
};
