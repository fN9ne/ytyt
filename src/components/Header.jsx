/* images */
import { ReactComponent as Logo } from "../img/logo.svg";
/* packages */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* other imports */
import { getRoutes } from "../functions";
/* other components */
import Navbar from "./Navbar";
import Button from "../ui/Button";
/* main component */
const Header = () => {
	const isBurgerMenuActive = useSelector((state) => state.burger.isBurgerMenuActive);

	const dispatch = useDispatch();

	const closeBurgerMenu = () => dispatch({ type: "CLOSE_BURGER_MENU" });
	const openBurgerMenu = () => dispatch({ type: "OPEN_BURGER_MENU" });

	return (
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
						<Button className="header__registration" size="small">
							Регистрация
						</Button>
						<Button className="header__login" size="small" color="blue" arrow arrowType="left">
							Войти
						</Button>
					</div>
					<div onClick={openBurgerMenu} className="header-burger-menu">
						<span></span>
					</div>
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
									<Navbar
										vertical
										list={[
											...getRoutes(),
											{
												type: "button",
												text: "Регистрация",
												onClickEvent: () => console.log('Открытие модального окна "Регистрация".'),
											},
										]}
									/>
									<Button size="medium" color="blue" arrow arrowType="left">
										Войти
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
/* export */
export default Header;
