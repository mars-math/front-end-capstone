import React from 'react';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  // add underline to yes in Q and A, add answer, and Report later
  render() {
    return (
      <div>
        <div>
          {console.log('answerId ', this.props.answerId)}
          Q:  {this.props.questions.question_body}
          <span>   Helpful?  <u>Yes</u> ({this.props.questions.question_helpfulness})    |</span>
          <span>    <u>Add Answer</u></span>
        </div>
        <div>
          {console.log('answers ', this.props.questions.answers[this.props.answerId])}
          A:  {this.props.questions.answers[this.props.answerId].body}
        </div>
        <div class='answer-footer'>
          <span>by {this.props.questions.answers[this.props.answerId].answerer_name}</span>
          <span>    date {new Date(this.props.questions.answers[this.props.answerId].date).toLocaleString().split(",")[0]} |</span>
          <span>    Helpful?  <u>Yes</u> ({this.props.questions.answers[this.props.answerId].helpfulness})</span>
          <span>     |  <u>Report</u> </span>
        </div>
      </div>
    );
  }

}

export default QuestionsView;