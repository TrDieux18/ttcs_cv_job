import { createSlice } from "@reduxjs/toolkit";

const getStoredCompanies = () => {
  const data = localStorage.getItem("followedCompanies");

  if (!data || data === "undefined") return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const initialState = {
  followedCompanies: getStoredCompanies(),
};

const followedCompaniesSlice = createSlice({
  name: "followedCompanies",
  initialState,
  reducers: {
    setFollowedCompanies: (state, action) => {
      state.followedCompanies = action.payload;
      localStorage.setItem(
        "followedCompanies",
        JSON.stringify(state.followedCompanies)
      );
    },

    addFollowedCompany: (state, action) => {
      if (!state.followedCompanies.includes(action.payload)) {
        state.followedCompanies.push(action.payload);
        localStorage.setItem(
          "followedCompanies",
          JSON.stringify(state.followedCompanies)
        );
      }
    },

    removeFollowedCompany: (state, action) => {
      state.followedCompanies = state.followedCompanies.filter(
        (id) => id !== action.payload
      );

      localStorage.setItem(
        "followedCompanies",
        JSON.stringify(state.followedCompanies)
      );
    },
  },
});

export const {
  setFollowedCompanies,
  addFollowedCompany,
  removeFollowedCompany,
} = followedCompaniesSlice.actions;

export default followedCompaniesSlice.reducer;
