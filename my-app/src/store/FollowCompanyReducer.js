import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: JSON.parse(localStorage.getItem("followedCompanies") || "[]"),
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
        (jobId) => jobId !== action.payload
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
