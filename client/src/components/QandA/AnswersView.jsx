import React from 'react';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  // up to 4 questions on load
  // 2 answers per question on load
  render() {
    return (
      <>
        <span class='answer-list'>{this.props.answer.body}</span>
        <div class='answer-footer'>
          <span>by {this.props.answer.answerer_name}</span>
          <span>    date {new Date(this.props.answer.date).toLocaleString().split(",")[0]} |</span>
          <span>    Helpful?  </span>
          <span><u>Yes</u> ({this.props.answer.helpfulness})</span>
          <span>     |  <u>Report</u> </span>
        </div>
      </>
    );
  }

}

export default AnswersView;
// {console.log('answers in AV ', this.props.answer)}