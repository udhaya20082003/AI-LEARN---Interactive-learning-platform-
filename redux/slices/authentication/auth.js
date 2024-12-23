import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

const authenticationSuccessReducer = (state) => {
  return {
    ...state,
    isAuthenticated: true,
  };
};

const authenticationFailReducer = (state) => {
  return {
    ...state,
    isAuthenticated: false,
  };
};

const signupSuccessReducer = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    user: action.payload,
  };
};

const registrationSuccessReducer = (state, action) => {
  localStorage.setItem("access", action.payload.access);
  localStorage.setItem("refresh", action.payload.refresh);
  return {
    ...state,
    isAuthenticated: true,
    access: action.payload.access,
    refresh: action.payload.refresh,
  };
};

const registrationFailReducer = (state) => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return {
    ...state,
    access: null,
    refresh: null,
    isAuthenticated: false,
    user: null,
  };
};

const loadUserSuccessReducer = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    user: action.payload,
  };
};

const loadUserFailReducer = (state) => {
  return {
    ...state,
    isAuthenticated: false,
    user: null,
  };
};

const activateAccountReducer = (state) => {
  return {
    ...state,
  };
};

const resetPasswordReducer = (state) => {
  return {
    ...state,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SIGNUP_SUCCESS: signupSuccessReducer,
    SIGNUP_FAIL: registrationFailReducer,
    ACTIVATION_SUCCESS: activateAccountReducer,
    ACTIVATION_FAIL: activateAccountReducer,
    LOGIN_SUCCESS: registrationSuccessReducer,
    LOGIN_FAIL: registrationFailReducer,
    PASSWORD_RESET_SUCCESS: resetPasswordReducer,
    PASSWORD_RESET_FAIL: resetPasswordReducer,
    PASSWORD_RESET_CONFIRM_SUCCESS: resetPasswordReducer,
    PASSWORD_RESET_CONFIRM_FAIL: resetPasswordReducer,
    AUTHENTICATED_SUCCESS: authenticationSuccessReducer,
    AUTHENTICATED_FAIL: authenticationFailReducer,
    USER_LOADED_SUCCESS: loadUserSuccessReducer,
    USER_LOADED_FAIL: loadUserFailReducer,
    LOGOUT: registrationFailReducer,
  },
});

export const {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGOUT,
} = authSlice.actions;
export default authSlice.reducer;
