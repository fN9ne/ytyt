/* images */
import { ReactComponent as Checkmark } from "../img/icons/checkmark_circled.svg";
/* packages */
import { useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
/* main component */
const Alert = ({ state, text, type }) => {
	const dispatch = useDispatch();

	return (
		<Transition timeout={250} mountOnEnter unmountOnExit in={state}>
			{(state) => (
				<div
					className={`alert${type ? " alert_" + type : ""} ${state}`}
					onClick={() => dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: false })}
				>
					<div className="alert__content">
						{type === "success" && <Checkmark />}
						<span>{text}</span>
					</div>
				</div>
			)}
		</Transition>
	);
};
/* export */
export default Alert;
