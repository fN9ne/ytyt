/* images */
/* packages */
import { Routes, useLocation, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
/* other components */
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Alert from "./components/Alert";
/* main component */
const App = () => {
	const location = useLocation();

	const alertState = useSelector((state) => state.alert);

	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "true") dispatch({ type: "LOGGED_IN" });
		if (localStorage.getItem("lastPage"))
			dispatch({ type: "CHANGE_LAST_PAGE", payload: Number(localStorage.getItem("lastPage")) });
		if (localStorage.getItem("result")) dispatch({ type: "SET_RESULT", payload: Number(localStorage.getItem("result")) });

		/* fetch("https://api.jsonbin.io/v3/b/648cb2ec8e4aa6225eaf6fa1", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
				"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
			},
			body: JSON.stringify([{ login: "admin", email: "", password: "adminadmin" }]),
		}); */
	}, []);

	return (
		<>
			<Alert state={alertState.isAlertActive} type={alertState.alertType} text={alertState.alertText} />
			<Header />
			<main className="page">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<HomePage />}></Route>
				</Routes>
			</main>
		</>
	);
};
/* export */
export default App;
