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

const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

const fetchEventById = (events) => ({
  type: EVENT_BY_MEMBER,
  payload: events,
});

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
