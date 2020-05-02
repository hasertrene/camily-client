import {
  FETCH_EVENTS_SUCCESS,
  DELETE_SUCCESS,
  EVENT_UPDATED,
  EVENT_POSTED,
  FETCH_BIRTHDAYS_SUCCESS,
} from "./actions";

const initialState = { events: [], activities: [], birthdays: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return { ...state, ...action.payload };

    case FETCH_BIRTHDAYS_SUCCESS:
      return { ...state, birthdays: action.payload };

    case EVENT_UPDATED:
      const newList = state.events.filter((e) => e.id !== action.payload.id);
      return { ...state, events: [...newList, action.payload] };

    case EVENT_POSTED:
      return { ...state, events: [...state.events, action.payload] };

    case DELETE_SUCCESS:
      const eventId = action.payload;
      const newEvents = state.events.filter((event) => event.id !== eventId);
      return {
        ...state,
        events: newEvents,
      };

    default:
      return state;
  }
};
