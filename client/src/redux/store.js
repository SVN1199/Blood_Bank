import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadersReducer from "./loadersSlice";

const store = configureStore({
    reducer :{
        users : userReducer,
        loaders : loadersReducer
    }
})

export default store