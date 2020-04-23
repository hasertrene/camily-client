import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  POST_MEMBER_SUCCESS,
  PATCH_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  UPDATE_USER,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  members: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case UPDATE_USER:
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case POST_MEMBER_SUCCESS:
      return { ...state, members: [...state.members, action.payload] };

    case PATCH_MEMBER_SUCCESS:
      const newList = state.members.filter(
        (member) => member.id !== action.payload.id
      );
      return { ...state, members: [...newList, action.payload] };

    case DELETE_MEMBER_SUCCESS:
      const newMembers = state.members.filter(
        (member) => action.payload.id !== member.id
      );
      return { ...state, members: [...newMembers] };

    default:
      return state;
  }
};
