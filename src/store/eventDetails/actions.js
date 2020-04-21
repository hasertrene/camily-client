import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const EVENT_BY_MEMBER = "EVENT_BY_MEMBER";
export const FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS";
export const EVENT_UPDATED = "EVENT_UPDATED";
export const EVENT_POSTED = "EVENT_POSTED";

const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

const fetchEventByIdSuccess = (event) => {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: event,
  };
};

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

export const postEvent = (
  title,
  description,
  date,
  time,
  memberId,
  activityId
) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
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
      dispatch(postEventSuccess(response.data));
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
      dispatch(updateEventSuccess(response.data));
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

export const fetchEventById = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchEventByIdSuccess(response.data));
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
