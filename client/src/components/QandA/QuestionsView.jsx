import React from 'react';
import AnswersView from './AnswersView.jsx';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
          {console.log('answerObj ', this.props.questions.answers)}
          {console.log('answerId ', this.props.answerId)}
          {console.log('answers as this.props.answers ', this.props.answers)}
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


// return (
//   <div>
//     <div>
//       {console.log('answerObj ', this.props.questions.answers)}
//       {console.log('answerId ', this.props.answerId)}
//       {console.log('answers as this.props.answers ', this.props.answers)}
//       Q:  {this.props.questions.question_body}
//       <span>   Helpful?  <u>Yes</u> ({this.props.questions.question_helpfulness})    |</span>
//       <span>    <u>Add Answer</u></span>
//     </div>
//     <div>
//       {this.props.answerId.map((id, index) =>
//         id={id},
//         console.log('answers with the ID', this.props.questions.answers[id]),
//         this.props.questions.answers[id].body
//       )}
//     </div>
//     <div>
//       {this.answersFormat(this.props.answers)}
//       {this.props.answers.map((answer, index) =>
//       <AnswersView answer={answer} key={index}/>)}
//     </div>
//     <div class='answer-footer'>
//       <span>by {this.props.questions.answers[this.props.answerId].answerer_name}</span>
//       <span>    date {new Date(this.props.questions.answers[this.props.answerId].date).toLocaleString().split(",")[0]} |</span>
//       <span>    Helpful?  </span>
//       <span><u>Yes</u> ({this.props.questions.answers[this.props.answerId].helpfulness})</span>
//       <span>     |  <u>Report</u> </span>
//     </div>
//   </div>
// );
