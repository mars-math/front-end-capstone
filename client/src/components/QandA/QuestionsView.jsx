import React from 'react';
import AnswersView from './AnswersView.jsx';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreQuestions: false
    }

  }

  answersFormat(answers) {
    // if (answers.length > 0) {
    //   (for var key in this.props.questions.answers) {
    //     <AnswersView answer={{key: this.props.questions.answers[key]}} key={key}/>
    //   }
    // }
  }

  // up to 4 questions on load
  // 2 answers per question on load
  render() {
    return (
      <div>
        <div>
          Q:  {this.props.questions.question_body}
          <span>   Helpful?  <u>Yes</u> ({this.props.questions.question_helpfulness})    |</span>
          <span>    <u>Add Answer</u></span>
        </div>
        <div>
          {this.props.answerId.map((id, index) =>
            <AnswersView answer={this.props.questions.answers[id]} key={index}/>
          )}
        </div>
      </div>
    );
  }

}

export default QuestionsView;

// {console.log('answers as this.props.answers ', this.props.answers)}