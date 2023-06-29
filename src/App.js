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
