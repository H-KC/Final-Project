import {
  CLEAR_CURRENT,
  SET_CURRENT,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_EXPENSE_PROJECT_NAME,
  GET_EXPENSES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(({ id }) => id !== action.payload),
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
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.payload.id) {
            return action.payload;
          } else {
            return expense;
          }
        }),
        current: null,
      };
    case UPDATE_EXPENSE_PROJECT_NAME:
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.projectid === action.payload.id) {
            let holder = expense;
            holder.projectName = action.payload.newName;
            return holder;
          } else {
            return expense;
          }
        }),
      };
    default:
      return state;
  }
};
