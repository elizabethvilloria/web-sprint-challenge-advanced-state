import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  const { message } = props;

  return (
    <div id="message">
      {message && <div className="message">{message}</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  message: state.infoMessage, // Assuming your message state is stored under infoMessage
});

export default connect(mapStateToProps)(Message);