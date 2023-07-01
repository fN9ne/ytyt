/* images */
import { ReactComponent as Illustration } from "../img/illustrations/typewriting.svg";
import { ReactComponent as Illustration2 } from "../img/illustrations/technologies.svg";
import { ReactComponent as Pit } from "../img/pit.svg";
import { ReactComponent as ArrowDown } from "../img/icons/arrow_down.svg";
import { ReactComponent as PracticeIcon } from "../img/advantages/practice.svg";
import { ReactComponent as MethodsIcon } from "../img/advantages/methods.svg";
import { ReactComponent as ComputerIcon } from "../img/advantages/computer.svg";
import { ReactComponent as CalendarIcon } from "../img/advantages/calendar.svg";
import { ReactComponent as FeedbackIcon } from "../img/advantages/feedback.svg";
import { ReactComponent as PaymentIcon } from "../img/advantages/payment.svg";
import { ReactComponent as RefundIcon } from "../img/advantages/refund.svg";
/* packages */
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/* other components */
import { QuizModal } from "../components/Modals";
import Button from "../ui/Button";
/* main component */
const HomePage = () => {
	const isQuizModalActive = useSelector((state) => state.modals.quizActive);

	return (
		<>
			<WelcomeScreen />
			<SkillsScreen />
			<AdvantagesScreen />
			<Transition in={isQuizModalActive} timeout={250} mountOnEnter unmountOnExit>
				{(state) => <QuizModal transitionClassName={state} />}
			</Transition>
		</>
	);
};
/* export */
export default HomePage;
/* screens */
const WelcomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<div className="home">
			<div className="home__container container">
				<div className="home__main">
					<div className="home__content">
						<h1 className="home__title text text_biggest">
							<p>
								Школа
								<span> {"{"}</span>
								<i>программирования</i>
								<span>{"}"}</span>
							</p>
							<p>для тех, кому нужны</p>
							<p>реальные навыки,</p>
							<p>а не просто сертификат</p>
						</h1>
						<div className="home__divider"></div>
						<div className="home__description text">Пройдите тестирование, чтобы получить доступ к бесплатным вводным урокам</div>
						<Button
							onClickEvent={() => {
								dispatch({ type: "UPDATE_MODALS", payload: { quizActive: true } });
								document.body.classList.add("locked");
							}}
							className="home__button"
							size="big"
							color="orange"
							arrow
							arrowType="angle"
						>
							Пройти тестирование
						</Button>
					</div>
					<div className="home__illustration">
						<Illustration />
						<div className="home-background">
							<div className="home-background__circle home-background__circle-1"></div>
							<div className="home-background__circle home-background__circle-2"></div>
							<div className="home-background__circle home-background__circle-3"></div>
							<div className="home-background__circle home-background__circle-4"></div>
							<div className="home-background__circle home-background__circle-5"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="home__bottom">
				<Link to="/#" className="home__next-screen">
					<ArrowDown />
				</Link>
				<div className="home__transition">
					<Pit />
				</div>
			</div>
		</div>
	);
};
const SkillsScreen = () => {
	const steps = [
		{ text: "Язык программирования Python", color: "#5096FF" },
		{ text: "Сети", color: "#FFB359" },
		{ text: "Базы данных", color: "#FF6F50" },
		{ text: "Фрейморвки Flask и Django", color: "#4BD071" },
		{ text: "Отладка и тестирование", color: "#50C0FF" },
		{ text: "Docker", color: "#4B77B9" },
		{ text: "Git", color: "#AF93FF" },
	];

	return (
		<div className="skills">
			<div className="skills__container container">
				<h3 className="skills__title title title_center text text_biggest">Какие технологии вы изучите:</h3>
				<div className="skills__body">
					<div className="skills__illustration">
						<Illustration2 />
					</div>
					<div className="skills__content">
						<div className="skills__steps">
							{steps.map((step, index) => (
								<div style={{ backgroundColor: step.color }} className="skills__step" key={index}>
									{step.text}
								</div>
							))}
						</div>
						<h3 className="skills__text text text_medium">Это необходимый минимум для современного backend-разработчика</h3>
					</div>
				</div>
			</div>
		</div>
	);
};
const AdvantagesScreen = () => {
	const advantages = [
		{
			icon: <PracticeIcon />,
			name: "Огромное количество практики",
			text: "Более 500 самостоятельных заданий и 20 полноценных больших проектов",
		},
		{
			icon: <MethodsIcon />,
			name: "Современные методики обучения",
			text: "Спиральное обучение: погружаемся в материал постепенно, виток за витком",
		},
		{ icon: <ComputerIcon />, name: "Простое и понятное изложение", text: "Вместо заумных терминов – примеры из реального мира" },
		{ icon: <CalendarIcon />, name: "Гибкий график занятий", text: "Учитесь в любое время в удобном для вас темпе" },
		{
			icon: <FeedbackIcon />,
			name: "Прямая связь с опытными программистами",
			text: "Задавайте вопросы и отправляйте свой код на проверку",
		},
		{
			icon: <PaymentIcon />,
			name: "Оплата небольшими частями",
			text: "Платите только за тот материал, который сейчас изучаете, а не за весь курс сразу",
		},
		{ icon: <RefundIcon />, name: "Быстрый и легкий возврат", text: "Если передумаете учиться – вернем деньги за 3 рабочих дня" },
	];

	console.log(7 % 3, 1 % 3);

	return (
		<div className="advantages">
			<div className="advantages__container container">
				<h3 className="advantages__title title title_center text text_biggest">Обучение в YtYt - это удобно и результативно</h3>
				<div className="advantages__content">
					{advantages.map((item, index) => (
						<div
							className={`advantage${(index + 1) % 2 === 1 && advantages.length - 1 === index ? " advantage__full-mobile" : ""}`}
							key={index}
						>
							<div className="advantage__icon">{item.icon}</div>
							<div className="advantage__content">
								<h3 className="advantage__name text">{item.name}</h3>
								<div className="advantage__text text text_small">{item.text}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
