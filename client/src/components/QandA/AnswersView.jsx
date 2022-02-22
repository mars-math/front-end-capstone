import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedHelpfulA: true,
    };

    this.clickHelpfulA = this.clickHelpfulA.bind(this);
    this.helpfulACounterDisplay = this.helpfulACounterDisplay.bind(this);
  }

  clickHelpfulA() {
    const aID = this.props.answer.id;
    if (this.state.clickedHelpfulA) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${aID}/helpful`, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((results) => {
          console.log('results ', results);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ clickedHelpfulA: !this.state.clickedHelpfulA });
    }
  }

  helpfulACounterDisplay() {
    if (this.state.clickedHelpfulA) {
      return (<>{ this.props.answer.helpfulness }</>);
    }
    return (<>{ this.props.answer.helpfulness + 1 }</>);
  }
  // dynamically render the username with either <b> or not depending on seller

  render() {
    return (
      <>
        <span className="answer-list">{this.props.answer.body}</span>
        <div className="answer-footer">
          <span>
            by
            {' '}
            {this.props.answer.answerer_name === 'Seller' ?
              <b>{this.props.answer.answerer_name}</b> : <>{this.props.answer.answerer_name}</>}
          </span>
          <span>
            {' '}
            date
            {' '}
            {new Date(this.props.answer.date).toLocaleString().split(',')[0]}
            {' '}
            |
          </span>
          <span>    Helpful?  </span>
          <span onClick={this.clickHelpfulA}><u>Yes</u> </span>
          <span>({this.helpfulACounterDisplay()})</span>
          <span>     |  <u>Report</u> </span>
        </div>
      </>
    );
  }
}

export default AnswersView;
// {console.log('answer ', this.props.answer)}
// {console.log('answers in AV ', this.props.answer)}
