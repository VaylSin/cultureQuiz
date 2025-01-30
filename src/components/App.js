import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],
   // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
};

function reducer(state, action) {

  switch (action.type) {

    case "data_received":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case 'data_failed':
      return {
        ...state,
        status: 'error'
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points)
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore
      };
    case "clock":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };
    default:
      throw new Error("Action inconnue");
  }
}

const App = () => {

  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const calculateTotalPoints = (questions) => questions.reduce((total, question) => total + question.points, 0);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/VaylSin/cultureQuiz/refs/heads/master/data/db.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "data_received", payload: data }))
      .catch(error => dispatch({ type: "data_failed" }));
  }, []);

  return <div className="app">
    <Header />
    <Main>
      {status === 'loading'
        && <Loader />}
      {status === 'error' 
        && <Error />}
      {status === 'ready' 
        && <StartScreen numQuestions={questions.length} dispatch={dispatch} />}
      {status === 'active' 
        &&
        <>
          <Progress index={index}
            numQuestions={numQuestions}
            points={points}
            totalPoints={calculateTotalPoints(questions)}
            answer={answer}
          />
          <Question 
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              dispatch={dispatch}
            />
          </Footer>
        </>
      }
      {status === 'finished' &&
        <Finish
          points={points}
          dispatch={dispatch}
          highScore={highScore}
          totalPoints={calculateTotalPoints(questions)}
        />
      }
    </Main>
  </div>;
}
export default App ;