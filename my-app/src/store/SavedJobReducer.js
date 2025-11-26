import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: JSON.parse(localStorage.getItem("savedJobs") || "[]"),
};

const savedSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
    },
    addSavedJob: (state, action) => {
      if (!state.savedJobs.includes(action.payload)) {
        state.savedJobs.push(action.payload);
        localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
      }
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (jobId) => jobId !== action.payload
      );
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
    },
  },
});

export const { setSavedJobs, addSavedJob, removeSavedJob } = savedSlice.actions;
export default savedSlice.reducer;
