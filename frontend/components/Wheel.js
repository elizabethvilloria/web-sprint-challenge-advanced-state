import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {

  const handleClockwiseClick = () => {
    props.moveClockwise();
  };

  const handleCounterClockwiseClick = () => {
    props.moveCounterClockwise();
    }

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map(index => (
          <div
            key={index}
            className={`cog ${index === props.wheel.currentIndex ? 'active' : ''}`}
            style={{ "--i": index }}>
            {index === props.wheel.currentIndex ? 'B' : ''}
          </div> 
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);