import {authApi} from "../features/api/authAPI.js";
import  { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import { courseAPI } from "@/features/api/courseAPI.js";

const rootReducer=combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseAPI.reducerPath]: courseAPI.reducer,
    auth:authReducer
});
export default rootReducer;