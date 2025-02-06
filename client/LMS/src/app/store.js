import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer";
import { authApi} from "@/features/api/authAPI";
import { courseAPI } from "@/features/api/courseAPI";
export const appStore=configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware,courseAPI.middleware)
});

//bug: on every refresh the user data is removed from the api

const initializeUser=async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}));
}
initializeUser();