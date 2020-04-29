import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";
export const POST_MEMBER_SUCCESS = "POST_MEMBER_SUCCESS";
export const PATCH_MEMBER_SUCCESS = "PATCH_MEMBER_SUCCESS";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const updateUserSuccess = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

const postMemberSuccess = (member) => ({
  type: POST_MEMBER_SUCCESS,
  payload: member,
});
const patchMemberSuccess = (member) => ({
  type: PATCH_MEMBER_SUCCESS,
  payload: member,
});
const deleteMemberSuccess = (member) => ({
  type: DELETE_MEMBER_SUCCESS,
  payload: member,
});

export const logOut = () => ({ type: LOG_OUT });

export const updateUser = (email, password, name) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const response = await axios.patch(
        `${apiUrl}/update`,
        {
          email,
          password,
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateUserSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Account updated successfully!")
      );
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

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Account created"));
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

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "Welcome back!", 1500));
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

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const postMember = (input) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const { firstName, birthday, gender, colour, parent } = input;
    if (token === null) return;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/me`,
        {
          firstName,
          birthday,
          gender,
          colour,
          parent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(postMemberSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  };
};

export const patchMember = (input) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const { id, firstName, birthday, gender, colour, parent } = input;
    if (token === null) return;
    dispatch(appLoading());
    try {
      const response = await axios.patch(
        `${apiUrl}/me/${id}`,
        {
          firstName,
          birthday,
          gender,
          colour,
          parent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(patchMemberSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  };
};
export const deleteMember = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(appLoading());
    try {
      const response = await axios.delete(`${apiUrl}/me/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteMemberSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  };
};
