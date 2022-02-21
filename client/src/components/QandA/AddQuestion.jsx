import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.submitQuestion = this.submitQuestion.bind(this);
  }
  submitQuestion() {
    // axios.post()

    this.props.closeAddQuestion();
  }

  render() {
    return(
      <div class='popup-box'>
        <div class='box'>
          <span class="close-icon" onClick={this.props.closeAddQuestion}>x</span>
          <h3>Ask Your Question</h3>
          <h3>About the [Product Name]</h3>
          <form onSubmit={this.submitQuestion}>
            <label for='question'>Your Question *</label>
            <textarea id='question' type='text' required minlength='1'
              maxlength='1000' rows='10' cols="50"
              placeholder='What is your question?'
            />
            <label for='nickname'>What is your nickname *</label>
            <input id='nickname' type='text' required
              minlength='1' maxlength='60' placeholder='Example: jackson11!'
            />
            <div>For privacy reasons, do not use your full name or email address</div>
            <label for='email'>Your email *</label>
            <input id='email' type='email' required
              minlength='3' maxlength='60' placeholder='Ex: email@address.com'
            />
            <div>For authentication reasons, you will not be emailed</div>
            <button type='submit'>Submit</button>
          </form>

        </div>
      </div>
    );
  }
}

export default AddQuestion;
