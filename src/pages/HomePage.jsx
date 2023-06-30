/* images */
import { ReactComponent as Illustration } from "../img/illustrations/typewriting.svg";
/* packages */
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
/* other components */
import { QuizModal } from "../components/Modals";
import Button from "../ui/Button";
/* main component */
const HomePage = () => {
	const isQuizModalActive = useSelector((state) => state.modals.quizActive);

	const dispatch = useDispatch();

	return (
		<>
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
							<div className="home__description text">
								Пройдите тестирование, чтобы получить доступ к бесплатным вводным урокам
							</div>
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
					<div className="home__bottom"></div>
				</div>
			</div>
			<Transition in={isQuizModalActive} timeout={250} mountOnEnter unmountOnExit>
				{(state) => <QuizModal transitionClassName={state} />}
			</Transition>
		</>
	);
};
/* export */
export default HomePage;
