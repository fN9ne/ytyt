/* initial states */
const burgerState = {
	isBurgerMenuActive: false,
};
const loggedState = {
	isLoggedIn: false,
};
const modalsState = {
	signInActive: false,
	signUpActive: false,
};
const formsState = {
	signIn: {
		valid: {
			login: false,
			password: false,
		},
		value: {
			login: "",
			password: "",
		},
	},
	signUp: {
		valid: {
			login: false,
			email: false,
			password: false,
			passwordConfirm: false,
		},
		value: {
			login: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	},
};
const alertState = {
	isAlertActive: false,
	alertType: "success",
	alertText: "",
};
/* reducers */
export const alertReducer = (state = alertState, action) => {
	switch (action.type) {
		case "CHANGE_ALERT_TYPE":
			return {
				...state,
				alertType: action.payload,
			};
		case "UPDATE_ALERT_VISIBILITY":
			return {
				...state,
				isAlertActive: action.payload,
			};
		case "CHANGE_ALERT_TEXT":
			return {
				...state,
				alertText: action.payload,
			};
		default:
			return state;
	}
};
export const formsReducer = (state = formsState, action) => {
	switch (action.type) {
		case "UPDATE_SIGNUP_VALUE":
			return {
				...state,
				signUp: {
					...state.signUp,
					value: {
						...state.signUp.value,
						...action.payload,
					},
				},
			};
		case "UPDATE_SIGNUP_VALID":
			return {
				...state,
				signUp: {
					...state.signUp,
					valid: {
						...state.signUp.valid,
						...action.payload,
					},
				},
			};
		case "UPDATE_SIGNIN_VALUE":
			return {
				...state,
				signIn: {
					...state.signIn,
					value: {
						...state.signIn.value,
						...action.payload,
					},
				},
			};
		case "UPDATE_SIGNIN_VALID":
			return {
				...state,
				signIn: {
					...state.signIn,
					valid: {
						...state.signIn.valid,
						...action.payload,
					},
				},
			};
		default:
			return state;
	}
};
export const modalsReducer = (state = modalsState, action) => {
	switch (action.type) {
		case "CLOSE_ALL_MODALS":
			return {
				...state,
				...Object.fromEntries(Object.keys(state).map((key) => [key, false])),
			};
		case "UPDATE_MODALS":
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
export const burgerReducer = (state = burgerState, action) => {
	switch (action.type) {
		case "OPEN_BURGER_MENU":
			return {
				...state,
				isBurgerMenuActive: true,
			};
		case "CLOSE_BURGER_MENU":
			return {
				...state,
				isBurgerMenuActive: false,
			};
		default:
			return state;
	}
};
export const loggedReducer = (state = loggedState, action) => {
	switch (action.type) {
		case "LOGGED_IN":
			return {
				...state,
				isLoggedIn: true,
			};
		case "LOGGED_OUT":
			return {
				...state,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
