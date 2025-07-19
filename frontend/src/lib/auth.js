import axios from "axios";

const BASE_URL = "http://localhost:9090/user";
// lib/auth.js

export const registerUser = async ({ name, username, email, password }) => {
  // adapt endpoint based on your backend setup

  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Login API call
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
