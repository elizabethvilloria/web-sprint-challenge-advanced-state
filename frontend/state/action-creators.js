// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { }

export function moveCounterClockwise() { }

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz() { }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }

// export function postQuiz() {
//   return function (dispatch) {
//     // On successful POST:
//     // - Dispatch the correct message to the the appropriate state
//     // - Dispatch the resetting of the form
//   }
// }

export function postQuiz(payload) {
  return async function (dispatch) {
    try {
      console.log('Sending API request with payload:', payload);
      const response = await axios.post('http://localhost:9000/api/quiz/new', payload);

      if (response.status === 201) {
        const quizData = response.data; // The newly created quiz object
        console.log('Quiz successfully created:', quizData);

        // Dispatch the correct message to the state
        dispatch(setMessage('Quiz successfully created'));

        // Optionally, you can dispatch an action to reset the form
        dispatch(resetForm());

        // After successfully creating the quiz, fetch it immediately
        dispatch(fetchQuiz()); // Fetch the newly created quiz
      } else if (response.status === 422) {
        // Handle error for malformed payload
        const errorMessage = response.data.reason || 'Malformed client payload';
        console.error('Malformed client payload:', errorMessage);
        dispatch(setMessage(errorMessage));
      } else {
        // Handle other status codes or generic errors
        console.error('An error occurred:', response.status);
        dispatch(setMessage('An error occurred.'));
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
