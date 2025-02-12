import {authApi} from "../features/api/authAPI.js";
import  { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import { courseAPI } from "@/features/api/courseAPI.js";
import { purchaseAPI } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressAPI.js";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseAPI.reducerPath]: courseAPI.reducer,
  [purchaseAPI.reducerPath]: purchaseAPI.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  auth: authReducer,
});
export default rootReducer;