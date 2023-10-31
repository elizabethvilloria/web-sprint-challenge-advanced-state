import React from 'react';
import { connect } from 'react-redux';
import { inputChange, postQuiz } from '../state/action-creators'; 

export function Form(props) {
  const { newQuestion, newTrueAnswer, newFalseAnswer, inputChange, postQuiz } = props;

  const isFormValid = () => {
    return newQuestion.trim() && newTrueAnswer.trim() && newFalseAnswer.trim();
  };

  const onChange = evt => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    if (isFormValid()) {
      const formData = {
        question_text: newQuestion.trim(),
        true_answer_text: newTrueAnswer.trim(),
        false_answer_text: newFalseAnswer.trim(),
      };
      
      postQuiz(formData);
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        value={newQuestion} 
        onChange={onChange} 
        id="newQuestion" 
        placeholder="Enter question" 
      />
      <input 
        maxLength={50} 
        value={newTrueAnswer} 
        onChange={onChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer" 
      />
      <input 
        maxLength={50} 
        value={newFalseAnswer} 
        onChange={onChange} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
      />
      <button id="submitNewQuizBtn" disabled={!isFormValid()}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  newQuestion: state.form.newQuestion,
  newTrueAnswer: state.form.newTrueAnswer,
  newFalseAnswer: state.form.newFalseAnswer,
});

const mapDispatchToProps = {
  inputChange,
  postQuiz
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
