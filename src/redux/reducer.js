/* initial states */
const burgerState = {
	isBurgerMenuActive: false,
};
const loggedState = {
	isLoggedIn: false,
};
/* reducers */
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
