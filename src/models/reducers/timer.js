import { SET_DURATION, SET_DASH_OFFSET, SET_COUNTER } from "../actions";

const timerState = {
  duration: 0,
  counter: 0,
  dashOffset: 0,
  finalDashOffset: 980,
  timer: [
    { name: "Work", time: 0 },
    { name: "Short Break", time: 0 },
    { name: "Long Break", time: 0 }
  ]
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case SET_COUNTER:
      return {
        ...state,
        counter: action.payload
      };
    case SET_DASH_OFFSET:
      return {
        ...state,
        dashOffset: action.payload
      };
    default:
      return state;
  }
};

export { timerReducer, timerState };
