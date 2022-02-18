import React from 'react';
import AnswersView from './AnswersView.jsx';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreAnswers: false,
    }

    this.showAnswers = this.showAnswers.bind(this);
    this.loadAnswersClick = this.loadAnswersClick.bind(this);
    this.loadTextChange = this.loadTextChange.bind(this);
  }


  showAnswers(answerList, idArray) {
    if (Object.keys(answerList).length > 2 && this.state.moreAnswers === false) {
      return <>
        {idArray.slice(0, 2).map((id, index) =>
        <AnswersView answer={answerList[id]} key={index}/>
        )}
      </>;
    } else if (Object.keys(answerList).length > 0 && this.state.moreAnswers === true
    || Object.keys(answerList).length > 0 && this.state.moreAnswers === false) {
      return <>
        {idArray.map((id, index) =>
        <AnswersView answer={answerList[id]} key={index}/>
        )}
      </>;
    } else {
      return <></>;
    }
  }

  loadAnswersClick() {
    this.setState({ moreAnswers: !this.state.moreAnswers });
  }

  loadTextChange() {
    if (Object.keys(this.props.answers).length > 2) {
      if (this.state.moreAnswers) {
        return <>SHOW LESS ANSWERS</>;
      } else {
        return <>LOAD MORE ANSWERS</>;
      }
    } else {
      return <></>;
    }
  }

  // up to 4 questions on load

  render() {
    return (
      <div>
        <div class='question-list'>
          {console.log('answers as this.props.answers ', this.props.answers)}
          Q:  {this.props.questions.question_body}
          <span>   Helpful?  <u>Yes</u> ({this.props.questions.question_helpfulness})    |</span>
          <span>    <u>Add Answer</u></span>
        </div>
        <div>
          <span>A:</span>
          <span>{this.showAnswers(this.props.answers, this.props.answerId)}</span>
          <div class='load-answers' onClick={this.loadAnswersClick}><b>{this.loadTextChange()}</b>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionsView;

// {console.log('answers as this.props.answers ', this.props.answers)}

// {this.props.answerId.map((id, index) =>
//   <AnswersView answer={this.props.questions.answers[id]} key={index} moreAnswers={this.state.moreAnswers}/>
// )}
