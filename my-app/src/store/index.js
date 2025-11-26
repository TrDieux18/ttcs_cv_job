import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import appliedReducer from "./AppliedReducer";
import savedReducer from "./SavedJobReducer";
import followedCompaniesReducer from "./FollowCompanyReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    appliedJobs: appliedReducer,
    savedJobs: savedReducer,
    followedCompanies: followedCompaniesReducer,
  },
});

export default store;
