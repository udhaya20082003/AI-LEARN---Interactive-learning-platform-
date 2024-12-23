/* eslint-disable no-undef */
import axios from "axios";
import {
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
} from "../slices/authentication/auth";

import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  AUTHENTICATION_ERROR,
  ACTIVATION_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CONFIRM_ERROR,
  RESET,
} from "../slices/authentication/errors";

// Load the user information from the backend.
export async function load_user(dispatch) {
  // Check if the token is in the local storage.
  if (localStorage.getItem("access")) {
    // Prepare the request headers for the API call to the backend.
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      // Send a request to the backend to get the user information.
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/auth/users/me/",
        config
      );
      dispatch(USER_LOADED_SUCCESS(res.data));
    } catch (err) {
      dispatch(USER_LOADED_FAIL());
    }
  } else {
    dispatch(USER_LOADED_FAIL());
  }
}

// Check if the user is authenticated by checking the token in the local storage.
export async function checkAuthenticated(dispatch) {
  const access = localStorage.getItem("access");
  // Check for the token in the local storage.
  if (access) {
    // Prepare the request headers and body for the API call to the backend.
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: access });

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/auth/jwt/verify/",
        body,
        config
      );
      dispatch(AUTHENTICATED_SUCCESS());
    } catch (err) {
      dispatch(AUTHENTICATED_FAIL());
      dispatch(AUTHENTICATION_ERROR(err.response.data));
    }
  } else {
    dispatch(AUTHENTICATED_FAIL());
  }
}

// Send a request to the backend to log in the user.
export async function login(dispatch, email, password) {
  // Prepare the request headers and body for the API call to the backend.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/jwt/create/",
      body,
      config
    );

    dispatch(LOGIN_SUCCESS(res.data));
    dispatch(RESET());
  } catch (err) {
    dispatch(LOGIN_FAIL());
    dispatch(LOGIN_ERROR(err.response.data));
  }
}

// Send a request to the backend to create a new user.
export async function signup(
  dispatch,
  first_name,
  last_name,
  email,
  password,
  re_password,
  is_student = false,
  is_instructor = false
) {
  // Prepare the request headers and body for the API call to the backend.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password,
    is_student,
    is_instructor,
  });

  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/users/",
      body,
      config
    );

    dispatch(SIGNUP_SUCCESS(res.data));
    dispatch(RESET());
  } catch (err) {
    dispatch(SIGNUP_FAIL());
    dispatch(SIGNUP_ERROR(err.response.data));
  }
}

// Send vertification mail to the user to activate the account.
export async function activation(dispatch, uid, token) {
  // Prepare the request headers and body for the API call to the backend.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      import.meta.env.VITE_API_URL + "/auth/users/activation/",
      body,
      config
    );

    dispatch(ACTIVATION_SUCCESS());
    dispatch(RESET());
  } catch (err) {
    dispatch(ACTIVATION_FAIL());
    dispatch(ACTIVATION_ERROR(err.response.data));
  }
}

// Send a request to the backend to reset the password.
export async function reset_password(dispatch, email) {
  // Prepare the request headers and body for the API call to the backend.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      import.meta.env.VITE_API_URL + "/auth/users/reset_password/",
      body,
      config
    );

    dispatch(PASSWORD_RESET_SUCCESS());
    dispatch(RESET());
  } catch (err) {
    dispatch(PASSWORD_RESET_FAIL());
    dispatch(RESET_PASSWORD_ERROR(err.response.data));
  }
}

// Send a request to the backend to confirm the password reset.
export async function reset_password_confirm(
  dispatch,
  uid,
  token,
  new_password,
  re_new_password
) {
  // Prepare the request headers and body for the API call to the backend.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(
      import.meta.env.VITE_API_URL + "/auth/users/reset_password_confirm/",
      body,
      config
    );

    dispatch(PASSWORD_RESET_CONFIRM_SUCCESS());
    dispatch(RESET());
  } catch (err) {
    dispatch(PASSWORD_RESET_CONFIRM_FAIL());
    dispatch(RESET_PASSWORD_CONFIRM_ERROR(err.response.data));
  }
}

// Log out the user by removing the token from the local storage and setting the user to null.
export async function logout(dispatch) {
  dispatch(LOGOUT());
}
