/* packages */
import { Transition } from "react-transition-group";
/* main component */
const Loader = ({ className, state }) => {
	return (
		<Transition mountOnEnter unmountOnExit timeout={250} in={state}>
			{(state) => (
				<div className={`${className ? className + " " : ""}loader ${state}`}>
					<div className="loader__content">
						<div className="loader__circle"></div>
						<div className="loader__circle"></div>
						<div className="loader__circle"></div>
						<div className="loader__circle"></div>
					</div>
				</div>
			)}
		</Transition>
	);
};
/* export */
export default Loader;
