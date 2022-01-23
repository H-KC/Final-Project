import {
  ADD_WATERTOWER_STEPS,
  UPDATE_WATERTOWER_STEPS,
  GET_WATERTOWER_STEPS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WATERTOWER_STEPS:
      return {
        ...state,
        waterTowerSteps: action.payload,
      };
    case ADD_WATERTOWER_STEPS:
      return {
        ...state,
        waterTowerSteps: [...state.waterTowerSteps, action.payload],
      };
    case UPDATE_WATERTOWER_STEPS:
      return {
        ...state,
        waterTowerSteps: state.waterTowerSteps.map((item) => {
          if (item.stepsID === action.payload.id) {
            let holder = item;
            const today = new Date().toJSON().slice(0, 10);
            if (action.payload.index === "1") {
              holder.step1.state = "valid";
              holder.step2.state =
                holder.step2.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "2") {
              holder.step2.state = "valid";
              holder.step3.state =
                holder.step3.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "3") {
              holder.step3.state = "valid";
              holder.step4.state =
                holder.step4.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "4") {
              holder.step4.state = "valid";
              holder.step5.state =
                holder.step5.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "5") {
              holder.step5.state = "valid";
              holder.step6.state =
                holder.step6.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "6") {
              holder.step6.state = "valid";
              holder.step7.state =
                holder.step7.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "7") {
              holder.step7.state = "valid";
              holder.step8.state =
                holder.step8.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "8") {
              holder.step8.state = "valid";
              holder.step9.state =
                holder.step9.endDate < today ? "outdate" : "now";
            } else if (action.payload.index === "9") {
              holder.step9.state = "valid";
            }
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
