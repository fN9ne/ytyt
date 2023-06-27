/* images */
/* packages */
import { Routes, useLocation, Route } from "react-router-dom";
/* other components */
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
/* main component */
const App = () => {
	const location = useLocation();
	const vh = window.innerHeight / 100;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	return (
		<>
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
