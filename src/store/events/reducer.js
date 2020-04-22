import {
  FETCH_EVENTS_SUCCESS,
  DELETE_SUCCESS,
  EVENT_UPDATED,
  EVENT_POSTED,
} from "./actions";

const initialState = { events: [], activities: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return { ...action.payload };

    case EVENT_UPDATED: {
      // return state.events.map((event) => {
      //   if (event.id !== action.payload.id) {
      //     return event;
      //   }
      return { ...state, events: [...state.events, action.payload] };
      //   });
    }
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
