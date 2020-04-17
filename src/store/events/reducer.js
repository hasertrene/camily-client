import { FETCH_EVENTS_SUCCESS, EVENT_BY_MEMBER } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;

    case EVENT_BY_MEMBER:
      return [...state, action.payload];

    default:
      return state;
  }
};
