import {
  ADD_BUILDING,
  DELETE_BUILDING,
  CLEAR_CURRENT,
  SET_CURRENT,
  UPDATE_BUILDING,
  UPDATE_COMPANY_NAME,
  UPDATE_BUDGET,
  UPDATE_BSTATE,
  UPDATE_PRB,
  GET_BUILDINGS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BUILDINGS:
      return {
        ...state,
        buildings: action.payload,
      };
    case ADD_BUILDING:
      return {
        ...state,
        buildings: [action.payload, ...state.buildings],
      };
    case DELETE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.filter(({ id }) => id !== action.payload),
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
    case UPDATE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.map((building) => {
          if (building.id === action.payload.id) {
            return action.payload;
          } else {
            return building;
          }
        }),
        current: null,
      };
    case UPDATE_COMPANY_NAME:
      return {
        ...state,
        buildings: state.buildings.map((building) => {
          for (let i = 0; i < action.payload.buildings.length; i++) {
            if (action.payload.buildings[i] === building.id) {
              let newBuilding = building;
              newBuilding.company = action.payload.name;
              return newBuilding;
            }
          }
          return building;
        }),
      };
    case UPDATE_BUDGET:
      return {
        ...state,
        buildings: state.buildings.map((building) => {
          if (building.id === action.payload.id) {
            let holder = building;
            holder.budget = holder.budget - action.payload.amount;
            return holder;
          } else {
            return building;
          }
        }),
      };
    case UPDATE_BSTATE:
      return {
        ...state,
        buildings: state.buildings.map((building) => {
          if (building.name === action.payload.name) {
            let holder = building;
            holder.bstate = action.payload.state;
            return holder;
          } else {
            return building;
          }
        }),
      };
    case UPDATE_PRB:
      return {
        ...state,
        buildings: state.buildings.map((item) => {
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
