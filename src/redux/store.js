/* imports */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { quizReducer, burgerReducer, loggedReducer, modalsReducer, formsReducer, alertReducer } from "./reducer";
/* store */
const store = configureStore({
	reducer: combineReducers({
		burger: burgerReducer,
		logged: loggedReducer,
		modals: modalsReducer,
		forms: formsReducer,
		alert: alertReducer,
		quiz: quizReducer,
	}),
});
/* export */
export default store;
