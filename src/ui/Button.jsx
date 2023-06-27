/* images */
import { ReactComponent as Arrow } from "../img/icons/arrow.svg";
import { ReactComponent as ArrowAngle } from "../img/icons/arrow_angle.svg";
/* packages */
/* other components */
/* main component */
const Button = (props) => {
	return (
		<button
			onClick={props.onClickEvent}
			className={`${props.className ? props.className + " " : ""}button${props.arrow ? " button_arrow" : " button_default"}${
				props.size === "small"
					? " button_small"
					: props.size === "medium"
					? " button_medium"
					: props.size === "big"
					? " button_big"
					: ""
			}${props.color === "blue" ? " button_blue" : props.color === "orange" ? " button_orange" : ""}`}
		>
			{props.arrow && props.arrowType === "left" && <Arrow />}
			<span>{props.children}</span>
			{props.arrow && props.arrowType === "right" && <Arrow />}
			{props.arrow && props.arrowType === "angle" && <ArrowAngle />}
		</button>
	);
};
/* export */
export default Button;
