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
          {/* {console.log('answerId ', this.props.answerId)} */}
          {this.props.questions.question_body}
          <span>   Helpful? Yes ({this.props.questions.question_helpfulness})    |</span>
          <span>    add answer</span>
        </div>
        <div>
          {/* {console.log('answers ', this.props.questions.answers[this.props.answerId])} */}
          {this.props.questions.answers[this.props.answerId].body}
        </div>
        <div className='answer-footer'>
          <span>by {this.props.questions.answers[this.props.answerId].answerer_name}</span>
          <span>    date {new Date(this.props.questions.answers[this.props.answerId].date).toLocaleString().split(",")[0]} |</span>
          <span>    helpful {this.props.questions.answers[this.props.answerId].helpfulness}</span>
          <span>     |  report </span>
        </div>
      </div>
    );
  }

}

export default QuestionsView;