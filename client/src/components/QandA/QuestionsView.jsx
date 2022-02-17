import React from 'react';


class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }

  }
  // how to extract the answer id from the object?
  // add underline to yes in Q and A, add answer, and Report later
  render() {
    return (
      <>
        <div>
          {this.props.questions.question_body}
          <span>   Helpful? Yes {this.props.questions.question_helpfulness}</span>
          <span>   add answer</span>
        </div>
        <div>
          {console.log('answers ', this.props.questions.answers)}
          {this.props.questions.answers.body}
          the answer is being determined...
        </div>
          <div>
            <span>by </span>
            <span>    helpful </span>
            <span>    report </span>
          </div>
        <div>load more answers</div>
      </>
    );
  }

}

export default QuestionsView;