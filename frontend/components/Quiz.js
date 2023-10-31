import React, { useEffect, useState, createContext, useContext, useReducer } from 'react'
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quizData, selectedAnswer, selectAnswer, fetchQuiz, postAnswer} = props;

  useEffect(() => {
    if (!quizData || !quizData.quiz_id) {
      fetchQuiz();
    }
  }, [fetchQuiz]);


  const handleAnswerSelect = (index) => {
    if (quizData && quizData.quiz_id) {
      const selectedAnswerObject = quizData.answers[index];

    } else {
      console.log('Quiz ID is unavailable');
    }
  
    selectAnswer(index);
  };
  
const handlePostQuiz = async () => {
  if (!quizData || !quizData.quiz_id || selectedAnswer === null) {
    console.log('An error occurred.'); 
    return;
  }

  const quizId = quizData.quiz_id;
  const answerId = quizData.answers[selectedAnswer].answer_id;

  postAnswer(quizId, answerId);
};

  return (

    <div id="wrapper">
      {quizData && quizData.loading ? (
        'Loading next quiz...'
      ) : (
        <>
          <h2>{quizData.question}</h2>

          <div id="quizAnswers">
            {quizData.answers.map((answer, index) => (
              <div className={`answer ${selectedAnswer === index ? 'selected' : ''}`} key={index}>
                {answer.text}
                <button onClick={() => handleAnswerSelect(index)}>
                  
                  {selectedAnswer === index ? 'SELECTED' : 'Select'}
                </button>
              
              </div>
            ))}
  
          </div>

          <button id="submitAnswerBtn" disabled={selectedAnswer === null} onClick={handlePostQuiz}>Submit answer</button>
        </>
      )}
    </div>
  )
    }

function mapStateToProps(state) {
  return {
    quizData: state.quiz,
    selectedAnswer: state.selectedAnswer.selectedAnswer,
  };
}

const mapDispatchToProps = {
  fetchQuiz,
  selectAnswer,
  postAnswer
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
