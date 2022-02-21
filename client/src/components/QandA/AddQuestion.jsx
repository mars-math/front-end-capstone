import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: '',
    };
    this.submitQuestion = this.submitQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeNickname = this.changeNickname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  changeQuestion(e) {
    this.setState({ question: e.target.value });
    console.log(this.state.question);
  }

  changeNickname(e) {
    this.setState({ nickname: e.target.value });
    console.log(this.state.nickname);
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  }

  submitQuestion(e) {
    e.preventDefault();
    // console.log(this.state.question);
    // console.log(this.state.nickname);
    // console.log(this.state.email);
    // console.log(this.props.productID);
    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions', {
      body: this.state.question,
      name: this.state.nickname,
      email: this.state.email,
      product_id: Number(this.props.productID),
    })
      .then((response) => {
        console.log(response);
        this.props.getItemInfo();
      })
      .catch((err) => {
        console.log('make sure you email is in example@email.com format', err);
      });

    this.props.closeAddQuestion();
  }

  render() {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={this.props.closeAddQuestion}>x</span>
          <h3>Ask Your Question</h3>
          <h3>About the [Product Name]</h3>
          <form onSubmit={this.submitQuestion}>
            <label htmlFor="question">Your Question *</label>
            <textarea
              id="question"
              type="text"
              required
              minLength="1"
              maxLength="1000"
              rows="10"
              cols="50"
              placeholder="What is your question?"
              onChange={this.changeQuestion}
            />
            <label htmlFor="nickname">What is your nickname *</label>
            <input
              id="nickname"
              type="text"
              required
              minLength="1"
              maxLength="60"
              placeholder="Example: jackson11!"
              onChange={this.changeNickname}
            />
            <div>For privacy reasons, do not use your full name or email address</div>
            <label htmlFor="email">Your email *</label>
            <input
              id="email"
              type="email"
              required
              minLength="3"
              maxLength="60"
              placeholder="Ex: email@address.com"
              onChange={this.changeEmail}
            />
            <div>For authentication reasons, you will not be emailed</div>
            <button type="submit">Submit</button>
          </form>

        </div>
      </div>
    );
  }
}

export default AddQuestion;
