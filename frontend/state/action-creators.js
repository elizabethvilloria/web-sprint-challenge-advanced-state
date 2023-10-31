import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM, SET_QUIZ_INTO_STATE } from "./action-types"
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() { 
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(index) { 
  return {
    type: SET_SELECTED_ANSWER,
    payload: index,
  }
}

 export function setMessage(message) { 
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  }
}

export function inputChange(fieldName, value) {
  return {
    type: 'INPUT_CHANGE',
    payload: {
      fieldName: fieldName,
      value: value
    }
  };
}

export function setQuiz(quizData) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quizData,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}


// ❗ Async action creators

export function fetchQuiz() {
  return async function (dispatch) {
  
    dispatch({
      type: SET_QUIZ_INTO_STATE,
      payload: { loading: true }
    })
    try {

      const response = await axios.get('http://localhost:9000/api/quiz/next');
      console.log('API Response:', response);

      if (response.status === 200) {

        const quizData = response.data;
        const { quiz_id, question, answers } = quizData;
        console.log('Quiz ID:', quizData.quiz_id);
  

        dispatch({ 
          type: SET_QUIZ_INTO_STATE, 
          payload: { quiz_id, question, answers, loading: false, error: '' } });
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function postAnswer(quizId, answerId) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId });

      if (response.status === 200) {
        dispatch(setMessage(response.data.message));
        console.log(response.data.message)
        dispatch(selectAnswer(null));
        dispatch(fetchQuiz());

      } else {
        dispatch(setMessage('An error occurred.'));
      }
    } catch (error) {
      console.error(error);

    }
  };
}

export function postQuiz(formData) {
  return async function (dispatch) {
    try {
      // Make a POST request to submit the quiz data
      console.log("About to make the API call");

      const response = await axios.post('http://localhost:9000/api/quiz/new', formData);
      console.log("Received response:", response);

      if (response.status === 201) {
        const newQuizData = response.data; // The newly created quiz object

        dispatch(setMessage(`Congrats: "${newQuizData.question}" is a great question!`));
        dispatch(resetForm());
      }
    } catch (error) {
      dispatch(setMessage('An error occurred.'));
    }
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
