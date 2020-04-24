import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const EVENT_UPDATED = "EVENT_UPDATED";
export const EVENT_POSTED = "EVENT_POSTED";
export const DELETE_SUCCESS = "DELETE_SUCCESS";

const updateEventSuccess = (event) => {
  return {
    type: EVENT_UPDATED,
    payload: event,
  };
};

const postEventSuccess = (event) => {
  return {
    type: EVENT_POSTED,
    payload: event,
  };
};

const deleteEventSuccess = (id) => {
  return {
    type: DELETE_SUCCESS,
    payload: id,
  };
};

const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

export const postEvent = (input) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const { title, description, date, time, activityId, memberId } = input;
      const response = await axios.post(
        `${apiUrl}/events`,
        {
          title,
          description,
          date,
          time,
          memberId,
          activityId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("eventadded", response.data.event);
      dispatch(postEventSuccess(response.data.event));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updateEvent = (id, input) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const { title, description, date, time, activityId, memberId } = input;
      const response = await axios.patch(
        `${apiUrl}/events/${id}`,
        {
          title,
          description,
          date,
          time,
          activityId,
          memberId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateEventSuccess(response.data.event));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      // eslint-disable-next-line
      const response = await axios.delete(`${apiUrl}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteEventSuccess(id));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchEventsSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
