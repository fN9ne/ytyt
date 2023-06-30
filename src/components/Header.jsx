/* images */
import { ReactComponent as Logo } from "../img/logo.svg";
/* packages */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
/* other imports */
import { getRoutes } from "../functions";
/* other components */
import Navbar from "./Navbar";
import Button from "../ui/Button";
import { SignInModal, SignUpModal } from "./Modals";
/* main component */
const Header = () => {
	const modals = useSelector((state) => state.modals);

	const isLoggedIn = useSelector((state) => state.logged.isLoggedIn);

	const isBurgerMenuActive = useSelector((state) => state.burger.isBurgerMenuActive);
	const isSignInModalActive = modals.signInActive;
	const isSignUpModalActive = modals.signUpActive;

	const dispatch = useDispatch();

	const closeBurgerMenu = () => {
		dispatch({ type: "CLOSE_BURGER_MENU" });
		document.body.classList.remove("locked");
	};
	const openBurgerMenu = () => {
		dispatch({ type: "OPEN_BURGER_MENU" });
		document.body.classList.add("locked");
	};

	const updateModals = (value) => {
		dispatch({ type: "CLOSE_ALL_MODALS" });
		dispatch({ type: "UPDATE_MODALS", payload: value });
		closeBurgerMenu();
	};

	return (
		<>
			<header className="header">
				<div className="header__container container">
					<div className="header__content">
						<div className="header__main">
							<Link className="header__logo" to="/">
								<Logo />
							</Link>
							<Navbar list={getRoutes()} />
						</div>
						<div className="header__auth">
							{!isLoggedIn ? (
								<>
									<Button
										onClickEvent={() => {
											updateModals({ signUpActive: true });
											document.body.classList.add("locked");
										}}
										className="header__registration"
										size="small"
									>
										Регистрация
									</Button>
									<Button
										onClickEvent={() => {
											updateModals({ signInActive: true });
											document.body.classList.add("locked");
										}}
										className="header__login"
										size="small"
										color="blue"
										arrow
										arrowType="left"
									>
										Войти
									</Button>
								</>
							) : (
								<>
									<Link to="/profile" className="header__profile">
										<span className="text text_small">Профиль</span>
									</Link>
									<Button
										onClickEvent={() => {
											localStorage.removeItem("loggedIn");
											dispatch({ type: "LOGGED_OUT" });
											dispatch({ type: "CLOSE_ALL_MODALS" });
											dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: true });
											dispatch({ type: "CHANGE_ALERT_TEXT", payload: "Вы успешно вышли из аккаунта!" });
											dispatch({ type: "CHANGE_ALERT_TYPE", payload: "success" });
											setTimeout(() => dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: false }), 3500);
										}}
										classname="header__logout"
										size="small"
										color="orange"
										arrow
										arrowType="left"
									>
										Выход
									</Button>
								</>
							)}
						</div>
						<div onClick={openBurgerMenu} className="header-burger-menu">
							<span></span>
						</div>
					</div>
				</div>
			</header>
			<div
				onClick={(event) => {
					if (!event.target.closest(".header-burger-content__container")) {
						closeBurgerMenu();
					}
				}}
				className={`header-burger-content${isBurgerMenuActive ? " header-burger-content_active" : ""}`}
			>
				<div className="header-burger-content__body">
					<div className="header-burger-content__container">
						<div onClick={closeBurgerMenu} className="header-burger-content__close"></div>
						<div className="header-burger-content__inner">
							{!isLoggedIn ? (
								<>
									<Navbar
										vertical
										list={[
											...getRoutes(),
											{
												type: "button",
												text: "Регистрация",
												onClickEvent: () => {
													updateModals({ signUpActive: true });
													document.body.classList.add("locked");
												},
											},
										]}
									/>
									<Button
										onClickEvent={() => {
											updateModals({ signInActive: true });
											document.body.classList.add("locked");
										}}
										className="header__login"
										size="medium"
										color="blue"
										arrow
										arrowType="left"
									>
										Войти
									</Button>
								</>
							) : (
								<>
									<Navbar
										vertical
										list={[
											...getRoutes(),
											{
												text: "Профиль",
												path: "/profile",
											},
										]}
									/>
									<Button
										onClickEvent={() => {
											localStorage.removeItem("loggedIn");
											closeBurgerMenu();
											dispatch({ type: "LOGGED_OUT" });
											dispatch({ type: "CLOSE_ALL_MODALS" });
											dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: true });
											dispatch({ type: "CHANGE_ALERT_TEXT", payload: "Вы успешно вышли из аккаунта!" });
											dispatch({ type: "CHANGE_ALERT_TYPE", payload: "success" });
											setTimeout(() => dispatch({ type: "UPDATE_ALERT_VISIBILITY", payload: false }), 3500);
										}}
										classname="header__logout"
										size="medium"
										color="orange"
										arrow
										arrowType="left"
									>
										Выход
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<Transition in={isSignInModalActive} timeout={500} mountOnEnter unmountOnExit>
				{(state) => <SignInModal transitionClassName={state} />}
			</Transition>
			<Transition in={isSignUpModalActive} timeout={500} mountOnEnter unmountOnExit>
				{(state) => <SignUpModal transitionClassName={state} />}
			</Transition>
		</>
	);
};
/* export */
export default Header;
