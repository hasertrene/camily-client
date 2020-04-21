import {
  FETCH_EVENTS_SUCCESS,
  EVENT_BY_MEMBER,
  FETCH_EVENT_SUCCESS,
  EVENT_UPDATED,
  EVENT_POSTED,
} from "./actions";

const initialState = { events: [], activities: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};
