import axios from "axios";

const BASE_URL = "https://resumebuilder-0spv.onrender.com/";
// lib/auth.js

export const registerUser = async ({ name, username, email, password }) => {
  // adapt endpoint based on your backend setup

  try {
    const response = await axios.post(`${BASE_URL}/user/register`, {
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
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

//Passing the token in params ensures the backend receives it in the expected format/location, allowing it to authenticate and authorize the request properly. If your backend expects the token in headers, you should use the Authorization header instead. Always match your frontend request format to your backend's requirements.
export const getAboutUser = async (user) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/get_user_and_profile`, {
      params: {
        token: user.token,
      },
    });
    return response.data.userProfile;
  } catch (e) {
    return err.response.data;
  }
};

export const updateUserProfile = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/update_profile_data`, {
      token: user.token,
      bio: user.bio,
      currentPost: user.currentPost,
      education: user.education,
      pastWork: user.pastWork,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

//
// const getAllUserProfiles = createAsyncThunk(
//   "user/get_All_Users",
//   async (_, thunkAPI) => {
//     try {
//       const response = await clientServer.get("user/get_All_Users");
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
