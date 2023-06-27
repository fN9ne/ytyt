/* imports */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { burgerReducer, loggedReducer } from "./reducer";
/* store */
const store = configureStore({
	reducer: combineReducers({
		burger: burgerReducer,
		logged: loggedReducer,
	}),
});
/* export */
export default store;
