import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: '',
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.changeNickname = this.changeNickname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  changeAnswer(e) {
    this.setState({ answer: e.target.value });
    // console.log(this.state.answer);
  }

  changeNickname(e) {
    this.setState({ nickname: e.target.value });
    // console.log(this.state.nickname);
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
    // console.log(this.state.email);
  }

  // not updating to the list right away
  submitAnswer(e) {
    e.preventDefault();
    // console.log(this.state.question);
    // console.log(this.state.nickname);
    // console.log(this.state.email);
    // console.log(this.props.questionID);
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${this.props.questionID}/answers`, {
      body: this.state.answer,
      name: this.state.nickname,
      email: this.state.email,
    })
      .then((response) => {
        console.log('response from adding and answer ', response);
        // console.log('this.props ', this.props);
        this.props.getItemInfo();
      })
      .catch((err) => {
        console.log('make sure you email is in example@email.com format', err);
      });
    // this.props.getItemInfo();
    this.props.closeAddAnswer();
  }

  render() {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={this.props.closeAddAnswer}>x</span>
          <h3>Submit you Answer</h3>
          <h4>{this.props.productName}: {this.props.questionBody}</h4>
          <form onSubmit={this.submitAnswer}>
            <label htmlFor="answer">Your Answer *</label>
            <textarea
              id="answer"
              type="text"
              required
              minLength="1"
              maxLength="1000"
              rows="10"
              cols="50"
              placeholder="Enter your Answer"
              onChange={this.changeAnswer}
            />
            <br />
            <label htmlFor="nickname">What is your nickname *</label>
            <input
              id="nickname"
              type="text"
              required
              minLength="1"
              maxLength="60"
              placeholder="Example: jack543!"
              onChange={this.changeNickname}
            />
            <div>For privacy reasons, do not use your full name or email address</div>
            <br />
            <label htmlFor="email">Your email *</label>
            <input
              id="email"
              type="email"
              required
              minLength="3"
              maxLength="60"
              placeholder="Example: jack@email.com"
              onChange={this.changeEmail}
            />
            <div>For authentication reasons, you will not be emailed</div>
            <br />
            <button type="submit">Submit Answer</button>
          </form>

        </div>
      </div>
    );
  }
}

export default AddAnswer;
