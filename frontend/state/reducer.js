// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM, SET_QUIZ_INTO_STATE } from "./action-types"

const initialWheelState =  {
  currentIndex: 0,
}

function wheel (state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return {
        currentIndex: (state.currentIndex + 1) % 6,
      }
    case MOVE_COUNTERCLOCKWISE:
      return {
        currentIndex: (state.currentIndex - 1 + 6) % 6,
      }
    default:
      return state;
  }
}

const initialQuizState = {
  question: '',
  answers: [],
  loading: false,
  error: '',
}

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz_id: action.payload.quiz_id,
        question: action.payload.question,
        answers: action.payload.answers,
        loading: action.payload.loading,
        error: '',
      };
      default:
        return(state);
  }
}

const initialSelectedAnswerState = {
  selectedAnswer: null,
  answerOptions: [],
}

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        selectedAnswer: null,
      }
    default:
      return(state);
  }
}

const initialMessageState = ''

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default: 
    return(state)
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};

function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.value
      }
    case RESET_FORM:
      return initialFormState;
    default:
      return(state);
  }
}


export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
