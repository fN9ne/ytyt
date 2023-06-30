/* images */
import { ReactComponent as UserIcon } from "../img/icons/user.svg";
import { ReactComponent as LockIcon } from "../img/icons/lock.svg";
import { ReactComponent as EmailIcon } from "../img/icons/at.svg";
/* packages */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/* other components */
import Loader from "./Loader";
import FormItem from "../ui/FormItem";
import Button from "../ui/Button";
import Quiz from "./Quiz";
/* modals */
export const QuizModal = ({ transitionClassName }) => {
	return (
		<ModalBase size="big" className={transitionClassName}>
			<Quiz />
		</ModalBase>
	);
};
export const SignInModal = ({ transitionClassName }) => {
	const dispatch = useDispatch();

	const formValids = useSelector((state) => state.forms.signIn.valid);
	const formValues = useSelector((state) => state.forms.signIn.value);

	const [isUserFound, setIsUserFound] = useState(undefined);
	const [fetching, setFetching] = useState(false);

	const formIsValid = () => Object.values(formValids).every((item) => item === true);

	const sendForm = (event) => {
		event.preventDefault();

		if (formIsValid()) {
			setFetching(true);
			fetch("https://api.jsonbin.io/v3/b/648cb2ec8e4aa6225eaf6fa1/latest", {
				method: "GET",
				headers: {
					"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
					"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					const users = data.record;
					const userExistence =
						users.filter((user) => user.login === formValues.login && user.password === formValues.password).length > 0;

					setIsUserFound(userExistence);

					if (userExistence) {
						localStorage.setItem("loggedIn", true);

						dispatch({ type: "LOGGED_IN" });
						dispatch({ type: "CLOSE_ALL_MODALS" });
						dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: true });
						dispatch({ type: "CHANGE_ALERT_TEXT", payload: "Вы успешно авторизовались!" });
						dispatch({ type: "CHANGE_ALERT_TYPE", payload: "success" });
						dispatch({ type: "UPDATE_SIGNIN_VALUE", payload: { login: "", password: "" } });
						dispatch({ type: "UPDATE_SIGNIN_VALID", payload: { login: false, password: false } });

						setTimeout(() => dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: false }), 3500);
					}
				})
				.then(() => setFetching(false));
		}
	};

	return (
		<ModalBase className={transitionClassName} title="Войти">
			<Form onSubmit={(event) => sendForm(event)}>
				<Loader state={fetching} className="modal__loader" />
				<FormItem
					type="text"
					name="username"
					placeholder="Имя пользователя"
					icon={<UserIcon />}
					validation={{
						func: (value) => {
							dispatch({ type: "UPDATE_SIGNIN_VALID", payload: { login: value.length >= 5 } });
							dispatch({ type: "UPDATE_SIGNIN_VALUE", payload: { login: value } });
						},
						condition: (value) => value.length >= 5,
					}}
					errorMessage="Длина логина должна быть не менее 5 символов"
				/>
				<FormItem
					type="password"
					name="password"
					placeholder="Пароль"
					icon={<LockIcon />}
					validation={{
						func: (value) => {
							dispatch({ type: "UPDATE_SIGNIN_VALID", payload: { password: value.length >= 8 } });
							dispatch({ type: "UPDATE_SIGNIN_VALUE", payload: { password: value } });
						},
						condition: (value) => value.length >= 8,
					}}
					errorMessage="Длина пароля должна быть не менее 8 символов"
				/>
				<div className={`error-message${isUserFound === false ? " error-message_active" : ""}`}>
					Не верное имя пользователя или пароль
				</div>
				<div className="modal-form__bottom">
					<div
						onClick={() => {
							dispatch({ type: "CLOSE_ALL_MODALS" });
							dispatch({ type: "UPDATE_MODALS", payload: { signUpActive: true } });
						}}
						className="modal-form__link text text_small"
					>
						Зарегистрироваться
					</div>
					<Button disabled={!formIsValid() ? "disabled" : false} size="small" color="blue" arrow arrowType="left">
						Войти
					</Button>
				</div>
			</Form>
		</ModalBase>
	);
};
export const SignUpModal = ({ transitionClassName }) => {
	const dispatch = useDispatch();

	const formValids = useSelector((state) => state.forms.signUp.valid);
	const formValues = useSelector((state) => state.forms.signUp.value);

	const [isUserFound, setIsUserFound] = useState(undefined);
	const [fetching, setFetching] = useState(false);

	const formIsValid = () => Object.values(formValids).every((item) => item === true);

	const sendForm = (event) => {
		event.preventDefault();

		if (formIsValid()) {
			setFetching(true);
			fetch("https://api.jsonbin.io/v3/b/648cb2ec8e4aa6225eaf6fa1/latest", {
				method: "GET",
				headers: {
					"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
					"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					const userExistence = data.record.filter((user) => user.login === formValues.login).length > 0;

					setIsUserFound(userExistence);

					if (!userExistence) {
						fetch("https://api.jsonbin.io/v3/b/648cb2ec8e4aa6225eaf6fa1", {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
								"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
							},
							body: JSON.stringify([
								...data.record,
								{ login: formValues.login, email: formValues.email, password: formValues.password },
							]),
						})
							.then(() => {
								localStorage.setItem("loggedIn", true);

								dispatch({ type: "LOGGED_IN" });
								dispatch({ type: "CLOSE_ALL_MODALS" });
								dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: true });
								dispatch({ type: "CHANGE_ALERT_TEXT", payload: "Вы успешно зарегестрировались!" });
								dispatch({ type: "CHANGE_ALERT_TYPE", payload: "success" });
								dispatch({ type: "UPDATE_SIGNUP_VALUE", payload: { login: "", email: "", password: "", passwordConfirm: "" } });
								dispatch({
									type: "UPDATE_SIGNUP_VALID",
									payload: { login: false, email: false, password: false, passwordConfirm: false },
								});

								setTimeout(() => dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: false }), 3500);
							})
							.then(() => setFetching(false));
					} else {
						setFetching(false);
					}
				});
		}
	};

	return (
		<ModalBase className={transitionClassName} title="Зарегистрироваться">
			<Form onSubmit={(event) => sendForm(event)}>
				<Loader state={fetching} className="modal__loader" />
				<FormItem
					type="text"
					name="username"
					placeholder="Имя пользователя"
					icon={<UserIcon />}
					validation={{
						func: (value) => {
							dispatch({ type: "UPDATE_SIGNUP_VALID", payload: { login: value.length >= 5 } });
							dispatch({ type: "UPDATE_SIGNUP_VALUE", payload: { login: value } });
						},
						condition: (value) => value.length >= 5,
					}}
					errorMessage="Длина логина должна быть не менее 5 символов"
				/>
				<FormItem
					type="text"
					name="email"
					placeholder="Email"
					icon={<EmailIcon />}
					errorMessage="Неверный формат почты"
					validation={{
						func: (value) => {
							dispatch({
								type: "UPDATE_SIGNUP_VALID",
								payload: { email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) },
							});
							dispatch({ type: "UPDATE_SIGNUP_VALUE", payload: { email: value } });
						},
						condition: (value) => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value),
					}}
				/>
				<FormItem
					type="password"
					name="password"
					placeholder="Пароль"
					icon={<LockIcon />}
					errorMessage="Длина пароля должна быть не менее 8 символов"
					validation={{
						func: (value) => {
							dispatch({ type: "UPDATE_SIGNUP_VALID", payload: { password: value.length >= 8 } });
							dispatch({ type: "UPDATE_SIGNUP_VALUE", payload: { password: value } });
						},
						condition: (value) => value.length >= 8,
					}}
				/>
				<FormItem
					type="password"
					name="passwordConfirm"
					placeholder="Повторите пароль"
					icon={<LockIcon />}
					errorMessage="Пароли должный совпадать"
					validation={{
						func: (value) => {
							dispatch({ type: "UPDATE_SIGNUP_VALID", payload: { passwordConfirm: value === formValues.password } });
							dispatch({ type: "UPDATE_SIGNUP_VALUE", payload: { passwordConfirm: value } });
						},
						condition: (value) => value === formValues.password,
					}}
				/>
				<div className={`error-message${isUserFound === true ? " error-message_active" : ""}`}>
					Такой пользователь уже зарегестрирован
				</div>
				<div className="modal-form__bottom">
					<div
						onClick={() => {
							dispatch({ type: "CLOSE_ALL_MODALS" });
							dispatch({ type: "UPDATE_MODALS", payload: { signInActive: true } });
						}}
						className="modal-form__link text text_small"
					>
						Войти
					</div>
					<Button disabled={!formIsValid() ? "disabled" : false} size="small" color="blue" arrow arrowType="left">
						Зарегестрироваться
					</Button>
				</div>
			</Form>
		</ModalBase>
	);
};
/* modal form */
const Form = ({ children, onSubmit }) => {
	return (
		<form action="#" onSubmit={onSubmit} className="modal-form">
			{children}
		</form>
	);
};
/* modal base */
const ModalBase = ({ className, title, children, size = "small" }) => {
	const dispatch = useDispatch();

	return (
		<div
			onClick={(event) => {
				if (!event.target.closest(".modal__content")) {
					dispatch({ type: "CLOSE_ALL_MODALS" });
					document.body.classList.remove("locked");
				}
			}}
			className={`modal${className ? " " + className : ""}`}
		>
			<div className="modal__body">
				<div className={`modal__content${size === "big" ? " modal__content_big" : ""}`}>
					<div
						onClick={() => {
							dispatch({ type: "CLOSE_ALL_MODALS" });
							document.body.classList.remove("locked");
						}}
						className="modal__close"
					>
						<i></i>
					</div>
					{title && <h2 className="modal__title text text_semi">{title}</h2>}
					<div className="modal__inner">{children}</div>
				</div>
			</div>
		</div>
	);
};
