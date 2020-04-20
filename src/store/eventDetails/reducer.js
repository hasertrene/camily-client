import {
  EVENT_BY_MEMBER,
  FETCH_EVENT_SUCCESS,
  EVENT_UPDATED,
  EVENT_POSTED,
} from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_SUCCESS:
      return [...state, action.payload];

    case EVENT_UPDATED:
      return [...state, action.payload];

    case EVENT_POSTED:
      return [...state, action.payload];

    case EVENT_BY_MEMBER:
      return [...state, action.payload];

    default:
      return state;
  }
};
