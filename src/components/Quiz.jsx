/* images */
import { ReactComponent as Like } from "../img/icons/like.svg";
/* packages */
import { SwitchTransition, Transition } from "react-transition-group";
/* other components */
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
/* main component */
const Quiz = () => {
	const rightAnswers = useSelector((state) => state.quiz.answers.right);
	const userAnswers = useSelector((state) => state.quiz.answers.user);
	const lastPage = useSelector((state) => state.quiz.lastPage);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log(userAnswers);
	});

	const [currentPage, setCurrentPage] = useState(lastPage === undefined ? 0 : lastPage);

	const changeLastPage = (value) => dispatch({ type: "CHANGE_LAST_PAGE", payload: value });

	const changePage = (value) => {
		setCurrentPage(value);
		changeLastPage(value);
		localStorage.setItem("lastPage", value);
	};

	const checkAnswer = (question) => {
		return rightAnswers[question] === userAnswers[question];
	};

	return (
		<div className="quiz">
			<SwitchTransition mode="out-in">
				<Transition key={currentPage} timeout={350} mountOnEnter unmountOnExit>
					{(state) => (
						<>
							{currentPage === 0 && (
								<div className={`quiz__screen ${state} quiz__welcome`}>
									<h2 className="quiz__title quiz__title_center text text_semi">
										<p>Перед тем, как приступить к обучению, </p>
										<p>необходимо пройти небольшой тест</p>
									</h2>
									<div className="quiz__text quiz__text_center text">
										<p>Тест состоит из 4 заданий на логическое мышление и прочие навыки,</p>
										<p>необходимые программисту. Задания не самые простые. Но ни в коем</p>
										<p>случае не выбирайте ответы наугад. Если вы не можете дать</p>
										<p>правильный ответ – выбирайте пункт «Не знаю».</p>
									</div>
									<Button
										onClickEvent={() => changePage(1)}
										className="quiz__button quiz__button-start"
										size="big"
										arrow
										arrowType="angle"
										color="orange"
									>
										Начать тест
									</Button>
								</div>
							)}
							{currentPage === 1 && (
								<QuestionScreen
									state={state}
									questionNum="1"
									questionText="Иван Иванович купил в магазине у дома несколько пачек макарон по 40 рублей, несколько пачек печенья по 32 рубля и 2 пакета сока. Продавщица сказала, что с него 525 рублей (скидка не предусмотрена). Иван Иванович заявил, что его пытаются обсчитать. Действительно ли продавщица ошиблась в подсчетах?"
									buttonEvent={() => changePage(2)}
									answers={[
										"Да, сумма явно неверная",
										"Нет, такая сумма вполне могла получиться",
										"Не знаю, не получается решить",
									]}
								/>
							)}
							{currentPage === 2 && (
								<AnswerResultScreen
									state={state}
									result={checkAnswer("question1")}
									questionNum="1"
									answerText="Так как 1 пачка макарон стоит 40 рублей, то любое количество пачек будет стоить четное число рублей. Аналогично с печеньем. А так как пакетов сока ровно 2, то за сок тоже нужно будет отдать четное число рублей. Получается, что ни при каких условиях в результате не может получиться нечетное число 525, а значит, продавщица действительно пыталась обсчитать Ивана Ивановича."
									buttonEvent={() => changePage(3)}
								/>
							)}
							{currentPage === 3 && (
								<QuestionScreen
									state={state}
									questionNum="2"
									questionText="На склад привезли три машины для напитков. Одна из них выдаёт чай, вторая выдаёт кофе, а третья — чай или кофе (определяется случайно). Любой автомат продаст стакан напитка за одну монету. На каждом автомате приклеена этикетка с выдаваемым напитком. Но на заводе произошла ошибка, из-за чего на всех автоматах наклеены не те этикетки, которые должны быть. Cколько потребуется монет, чтобы определить, где какие автоматы?"
									buttonEvent={() => changePage(4)}
									answers={["1 монета", "2 монеты", "3 монеты", "Не знаю, не получается решить"]}
								/>
							)}
							{currentPage === 4 && (
								<AnswerResultScreen
									state={state}
									result={checkAnswer("question2")}
									questionNum="2"
									answerText="Потребуется одна монета, которую нужно бросить в автомат с наклейкой «случайный». Мы знаем, что это неправильная наклейка, поэтому это автомат с чаем либо кофе. После этого определяются остальные два автомата методом исключения. Например, если автомат выдал чай, то автомат с наклейкой «чай» на самом деле выдаёт кофе, а автомат с наклейкой «кофе» выдаёт случайный напиток."
									buttonEvent={() => changePage(5)}
								/>
							)}
							{currentPage === 5 && (
								<QuestionScreen
									state={state}
									questionNum="3"
									questionText="Сколько желудей за 9 минут съедят 9 белок, если 1.5 белки за 1.5 минуты поедают 1.5 желудя?"
									buttonEvent={() => changePage(6)}
									answers={["6 желудей", "54 желудя", "36 желудей", "Не знаю, не получается решить"]}
								/>
							)}
							{currentPage === 6 && (
								<AnswerResultScreen
									state={state}
									result={checkAnswer("question3")}
									questionNum="3"
									answerText="Если 1.5 белки съедают 1.5 желудя за 1.5 минуты, то 1 белка за 1.5 минуты съедает 1 желудь. Тогда 9 белок за 1.5 минуты съедают 9 желудей. Но по условию нужно узнать количество желудей, съедаемых за 9 минут: 9 минут / 1,5 минуты = 6 — во столько больше раз нам даётся времени, 9 желудей * 6 = 54 желудей съедят 9 белок за 9 минут."
									buttonEvent={() => changePage(7)}
								/>
							)}
							{currentPage === 7 && (
								<QuestionScreen
									state={state}
									questionNum="4"
									questionText="Есть треугольник с равными углами. На углах стоят по одному муравью. В какой-то момент муравьи начинают идти в другой угол вдоль стороны треугольника. В какой именно — определяется случайно. Каков шанс того, что ни один муравей не столкнётся с другим муравьём?"
									buttonEvent={() => changePage(8)}
									answers={["33%", "50%", "25%", "Не знаю, не получается решить"]}
								/>
							)}
							{currentPage === 8 && (
								<AnswerResultScreen
									state={state}
									result={checkAnswer("question4")}
									questionNum="4"
									answerText="Может показаться, что вероятность 33%, но это не так. Есть два варианта необходимого движения муравьёв: по часовой стрелке и против. Давайте сконцентрируемся на одном муравье. После того, как он случайным образом выбрал направление, ему нужно, чтоб и остальные муравьи двигались в эту же сторону. Шанс того, что второй муравей пойдёт в его направлении — 50%. Аналогичная вероятность и у третьего муравья. Это значит, что общая вероятность того, что муравьи не столкнутся — 25%."
									buttonEvent={() => changePage(9)}
								/>
							)}
							{currentPage === 9 && <ResultScreen state={state} />}
						</>
					)}
				</Transition>
			</SwitchTransition>
		</div>
	);
};
/* export */
export default Quiz;
/* screens */
const ResultScreen = ({ state }) => {
	const dispatch = useDispatch();

	const answers = useSelector((state) => state.quiz.answers);

	const countCorrectAnswers = (answers) => {
		let correctCount = 0;

		for (let question in answers.user) {
			if (answers.user[question] === answers.right[question]) {
				correctCount++;
			}
		}

		return correctCount;
	};

	const result = localStorage.getItem("result") ? Number(localStorage.getItem("result")) : countCorrectAnswers(answers);

	useEffect(() => {
		dispatch({ type: "SET_RESULT", payload: result });
		if (!localStorage.getItem("result")) localStorage.setItem("result", result);
	}, []);

	const resultText = () => {
		switch (result) {
			case 0:
				return "Не расстраивайтесь! Есть еще многое, что можно узнать.";
			case 1:
				return "Хорошее начало! Есть еще много, что можно узнать.";
			case 2:
				return "Отлично! Вы уже показываете хорошие результаты. У вас есть все шансы стать отличным программистом. Начните обучение прямо сейчас, доступ к вводным урокам уже открыт";
			case 3:
				return "Почти идеально! У вас есть все шансы стать отличным программистом. Начните обучение прямо сейчас, доступ к вводным урокам уже открыт";
			case 4:
				return "Это великолепный результат! У вас есть все шансы стать отличным программистом. Начните обучение прямо сейчас, доступ к вводным урокам уже открыт";
			default:
				return "Какая-то ошибка в отображении этого текста, если что во всём вините Front-end'ера, его лично захуесосить за это вы можете тут: https://t.me/fN9ne";
		}
	};

	return (
		<div className={`quiz__screen ${state} quiz__result`}>
			<div className={`quiz__estimation${[0, 1].includes(result) ? " quiz__estimation_bad" : ""}`}>
				<Like />
				<span className="text">НАБРАНО {result}/4</span>
			</div>
			<div className="quiz__result-text text text_medium">{resultText()}</div>
			<Button
				onClickEvent={() => {
					dispatch({ type: "CLOSE_ALL_MODALS" });

					if (![0, 1].includes(result)) {
						dispatch({ type: "UPDATE_MODALS", payload: { signInActive: true } });
					}
				}}
				className="quiz__button quiz__result-button"
				size="medium"
				arrow
				arrowType="right"
				color="orange"
			>
				<span>{[0, 1].includes(result) ? "Закрыть" : "Начать учиться бесплатно"}</span>
				<span>{[0, 1].includes(result) ? "Закрыть" : "Начать"}</span>
			</Button>
		</div>
	);
};
const AnswerResultScreen = ({ state, result, questionNum, answerText, buttonEvent }) => {
	return (
		<div className={`quiz__screen ${state} quiz__answer-result`}>
			<div className="quiz__label">ЗАДАНИЕ №{questionNum}</div>
			<h2 className="quiz__title text text_semi">
				{result ? "Правильно! С логикой у вас все отлично" : "Не совсем так. Еще немного работы над логикой!"}
			</h2>
			<div className="quiz__text text">{answerText}</div>
			<div className="quiz__subtext text">
				В этом задании проверялось ваше логчиеское мышление. Это критически важный навык для любого программиста.
			</div>
			<Button
				className="quiz__button quiz__button_right"
				onClickEvent={buttonEvent}
				size="medium"
				arrow
				arrowType="right"
				color="orange"
			>
				Далее
			</Button>
		</div>
	);
};
const QuestionScreen = ({ state, questionNum, questionText, buttonEvent, answers }) => {
	const dispatch = useDispatch();

	const isRadioChange = useSelector((state) => state.quiz.answers.user[`question${questionNum}`]);

	const changeUserAnswer = (question, value) => dispatch({ type: "CHANGE_ANSWER", payload: { [question]: value } });

	return (
		<div className={`quiz__screen ${state} quiz__quest`}>
			<div className="quiz__label">ЗАДАНИЕ №{questionNum}</div>
			<div className="quiz__text text">{questionText}</div>
			<div className="quiz__content">
				<div className="quiz__answers">
					{answers.map((answer, index) => (
						<label key={index} onClick={() => changeUserAnswer(`question${questionNum}`, index + 1)} className="quiz-answer">
							<input type="radio" name={`question${questionNum}`} />
							<div className="quiz-answer__label"></div>
							<span className="quiz-answer__text text">{answer}</span>
						</label>
					))}
				</div>
				<Button
					disabled={isRadioChange === undefined ? "disabled" : false}
					onClickEvent={buttonEvent}
					size="medium"
					arrow
					arrowType="right"
					color="orange"
				>
					Ответить
				</Button>
			</div>
		</div>
	);
};
