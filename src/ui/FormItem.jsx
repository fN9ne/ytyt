/* images */
import { useState } from "react";
import { ReactComponent as Checkmark } from "../img/icons/checkmark.svg";
/* packages */
/* other components */
/* main component */
const FormItem = ({ type = "text", name, placeholder, validation, icon, errorMessage }) => {
	const [isValid, setIsValid] = useState(false);
	const [isInputChanged, setIsInputChanged] = useState(false);

	return (
		<div className={`form-item${isInputChanged ? (isValid ? " form-item_valid" : " form-item_invalid") : ""}`}>
			<div className="error-message">{errorMessage}</div>
			<div className="form-item__input">
				<div className="form-item__icon">{icon}</div>
				<input
					onInput={(event) => {
						validation.func(event.target.value);
						setIsValid(validation.condition(event.target.value));
						setIsInputChanged(true);
					}}
					autoComplete={type === "password" ? "current-password" : "off"}
					type={type}
					name={name}
					placeholder={placeholder}
				/>
				<div className="form-item__correct">
					<Checkmark />
				</div>
			</div>
		</div>
	);
};
/* export */
export default FormItem;
