import {
  CLEAR_CURRENT,
  SET_CURRENT,
  ADD_WATERTOWER,
  DELETE_WATERTOWER,
  UPDATE_WATERTOWER,
  UPDATE_COMPANY_NAME,
  UPDATE_BUDGET,
  UPDATE_BSTATE,
  UPDATE_PRB,
  GET_WATERTOWERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WATERTOWERS:
      return {
        ...state,
        watertowers: action.payload,
      };
    case ADD_WATERTOWER:
      return {
        ...state,
        watertowers: [action.payload, ...state.watertowers],
      };
    case DELETE_WATERTOWER:
      return {
        ...state,
        watertowers: state.watertowers.filter(
          ({ id }) => id !== action.payload
        ),
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
    case UPDATE_WATERTOWER:
      return {
        ...state,
        watertowers: state.watertowers.map((watertower) => {
          if (watertower.id === action.payload.id) {
            return action.payload;
          } else {
            return watertower;
          }
        }),
        current: null,
      };
    case UPDATE_COMPANY_NAME:
      return {
        ...state,
        watertowers: state.watertowers.map((watertower) => {
          for (let i = 0; i < action.payload.watertowers.length; i++) {
            if (action.payload.watertowers[i] === watertower.id) {
              let newBuilding = watertower;
              newBuilding.company = action.payload.name;
              return newBuilding;
            }
          }
          return watertower;
        }),
      };
    case UPDATE_BUDGET:
      return {
        ...state,
        watertowers: state.watertowers.map((watertower) => {
          if (watertower.id === action.payload.id) {
            let holder = watertower;
            holder.budget = holder.budget - action.payload.amount;
            return holder;
          } else {
            return watertower;
          }
        }),
      };
    case UPDATE_BSTATE:
      return {
        ...state,
        watertowers: state.watertowers.map((watertower) => {
          if (watertower.name === action.payload.name) {
            let holder = watertower;
            holder.bstate = action.payload.state;
            return holder;
          } else {
            return watertower;
          }
        }),
      };
    case UPDATE_PRB:
      return {
        ...state,
        watertowers: state.watertowers.map((item) => {
          if (item.name === action.payload.name) {
            let holder = item;
            holder.currentStep = action.payload.val;
            return holder;
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};
