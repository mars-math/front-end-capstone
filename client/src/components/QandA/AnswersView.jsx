import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedHelpful: true,
    };

    // this.clickHelpfulA = this.clickHelpfulA.bind(this);
    // this.helpfulACounterDisplay = this.helpfulACounterDisplay.bind(this);
  }

  // clickHelpfulA() {
  //   const qID = this.props.questions.question_id;
  //   if (this.state.clickedHelpful) {
  //     axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${qID}/helpful`, {
  //       headers: {
  //         Authorization: API_KEY,
  //       },
  //     })
  //     .then((results) => {
  //       console.log('results ', results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     this.setState({ clickedHelpful: !this.state.clickedHelpful });
  //   }
  // }

  // helpfulACounterDisplay() {
  //   if (this.state.clickedHelpful) {
  //     return (<>{ this.props.questions.question_helpfulness }</>);
  //   } else {
  //     return (<>{ this.props.questions.question_helpfulness + 1}</>);
  //   }
  // }

  render() {
    return (
      <>
        <span class='answer-list'>{this.props.answer.body}</span>
        <div class='answer-footer'>
          <span>by {this.props.answer.answerer_name}</span>
          <span>    date {new Date(this.props.answer.date).toLocaleString().split(",")[0]} |</span>
          <span>    Helpful?  </span>
          <span><u>Yes</u> </span>
          <span>({this.props.answer.helpfulness})</span>
          <span>     |  <u>Report</u> </span>
        </div>
      </>
    );
  }

}

export default AnswersView;
// onClick={this.clickHelpfulA}
// {console.log('answers in AV ', this.props.answer)}
