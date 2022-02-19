/* eslint-disable no-else-return */
import React from 'react';
import AnswersView from './AnswersView.jsx';

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreAnswers: false,
      sortedAnswers: [],
    }

    this.showAnswers = this.showAnswers.bind(this);
    this.loadAnswersClick = this.loadAnswersClick.bind(this);
    this.loadTextChange = this.loadTextChange.bind(this);
  }

  showAnswers(answerList) {
    this.state.sortedAnswers = [];
    for (const k in answerList) {
      if (answerList[k].answerer_name === 'Seller') {
        this.state.sortedAnswers.unshift({ k: answerList[k] });
      } else {
        this.state.sortedAnswers.push(({ k: answerList[k] }));
      }
    }
    if (this.state.sortedAnswers.length > 2 && this.state.moreAnswers === false) {
      return (
        <>
          {this.state.sortedAnswers.slice(0, 2).map((sortedAns, index) =>
            <AnswersView answer={sortedAns.k} key={index} />
          )}
        </>
      );
    } else if (this.state.sortedAnswers.length > 0 && this.state.moreAnswers === true
      || this.state.sortedAnswers.length > 0 && this.state.moreAnswers === false) {
      return (
      <>
        {this.state.sortedAnswers.map((sortedAns, index) =>
          <AnswersView answer={sortedAns.k} key={index} />

        )}
      </>
      );
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

        return <>Collapse answers</>;
      } else {
        return <>See more answers</>;

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
          Q:  {this.props.questions.question_body}
          <span>   Helpful?  <u>Yes</u> ({this.props.questions.question_helpfulness})    |</span>
          <span>    <u>Add Answer</u></span>
        </div>
        <div>
          <span>A:</span>

          <span>{this.showAnswers(this.props.answers)}</span>

          <div class='load-answers' onClick={this.loadAnswersClick}><b>{this.loadTextChange()}</b>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionsView;
// {console.log('answers as this.props.answers ', this.props.answers)}

// {console.log('answers as this.props.answers ', this.props.answers)}

// {this.props.answerId.map((id, index) =>
//   <AnswersView answer={this.props.questions.answers[id]} key={index} moreAnswers={this.state.moreAnswers}/>
// )}
