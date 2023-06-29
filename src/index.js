/* imports */
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
/* redux */
import store from "./redux/store";
/* app component */
import App from "./App";
/* style */
import "./scss/fonts.scss";
import "./scss/null.scss";
import "./scss/index.scss";
import "./scss/ui/button.scss";
import "./scss/ui/text.scss";
import "./scss/ui/formitem.scss";
import "./scss/components/header.scss";
import "./scss/components/navbar.scss";
import "./scss/components/loader.scss";
import "./scss/components/modals.scss";
/* render root */
ReactDOM.createRoot(document.querySelector(".wrapper")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
