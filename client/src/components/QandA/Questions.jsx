import React from 'react';
import QuestionsView from './QuestionsView.jsx';
import AddQuestion from './AddQuestion.jsx';
// import sampleData from './QAdata/sampleData.js';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreQuestions: false,
      moreQuestions2: 0,
      // questionList: sampleData, // change props to state to use sampleData
      // questionList: [],
      sortedQuestions: [],
      showAddQ: false,
    };

    this.moreQuestionsClick = this.moreQuestionsClick.bind(this);
    this.moreQuestionsDisplay = this.moreQuestionsDisplay.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
    this.questionsOrSearchDisplay = this.questionsOrSearchDisplay.bind(this);
    this.clickAddQuestion = this.clickAddQuestion.bind(this);
    this.showAddQuestion = this.showAddQuestion.bind(this);
    this.clickAddQuestion = this.clickAddQuestion.bind(this);
  }

  // helper function to sort questions by helpfulness
  sortHelper(a, b) {
    return parseInt(b.question_helpfulness) - parseInt(a.question_helpfulness);
  }

  // render only 2 questions till more are selected
  showQuestions(questionL) {
    // const moreQuestions2 = this.props.questionList.results.length;
    // this.setState({ moreQuestions2: this.props.questionList.results.length });
    // console.log('moreQ2 ', moreQuestions2);
    const questionArray = questionL;
    const sortedQArray = questionArray.sort(this.sortHelper);
    this.state.sortedQuestions = sortedQArray;

    if (sortedQArray.length > 4 && this.state.moreQuestions === false) {
      return (
        <>
          {sortedQArray.slice(0, 4).map((questions, index) => (
            <QuestionsView
              questions={questions}
              key={index}
              answerId={Object.keys(questions.answers)}
              answers={questions.answers}
              getItemInfo={this.props.getItemInfo}
            />
          ))}
        </>
      );
    } if ((sortedQArray.length > 0 && this.state.moreQuestions === true)
    || (sortedQArray.length > 0 && this.state.moreQuestions === false)) {
      return (
        <>
          {sortedQArray.map((questions, index) => (
            <QuestionsView
              questions={questions}
              key={index}
              answerId={Object.keys(questions.answers)}
              answers={questions.answers}
              getItemInfo={this.props.getItemInfo}
            />
          ))}
        </>
      );
    }
    return <></>;
  }

  // used for rendering more questions
  moreQuestionsClick() {
    this.setState({ moreQuestions: !this.state.moreQuestions });
  }

  // render more questions
  moreQuestionsDisplay() {
    if (this.props.questionList.results.length > 0) {
      if (this.state.moreQuestions) {
        return (
          <button className="cust-button" onClick={this.moreQuestionsClick}>Less Answered Questions</button>
        );
      }
      return (
        <button className="cust-button" onClick={this.moreQuestionsClick}>More Answered Questions</button>
      );
    }
    return <></>;
  }

  // determine if the search filter list or main question list will display
  questionsOrSearchDisplay() {
    if (this.props.searchList.length > 0) {
      return this.showQuestions(this.props.searchList);
    }
    return this.showQuestions(this.props.questionList.results);
  }

  // handle the state for the add question pop out
  clickAddQuestion() {
    this.setState({ showAddQ: !this.state.showAddQ });
  }

  showAddQuestion() {
    if (this.state.showAddQ) {
      return (
        <AddQuestion
          showAddQ={this.state.showAddQ}
          closeAddQuestion={this.clickAddQuestion}
          productID={this.props.questionList.product_id}
          getItemInfo={this.props.getItemInfo}
        />
      );
    }
    return <></>;
  }

  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <div className="scroll">
        {this.questionsOrSearchDisplay()}
        {this.moreQuestionsDisplay()}
        <button className="cust-button" onClick={this.clickAddQuestion}>Add a Question</button>
        {this.showAddQuestion()}
      </div>
    );
  }
}

export default Questions;

// {/* {this.showQuestions(this.state.questionList.results)} */}
// {console.log('questionList ', this.state.questionList.results)}
// {console.log('questionList.results ', this.state.questionList.results)}

// {/* <button onClick={this.moreQuestionsClick}>More Answered Questions</button> */}

// {this.state.questionList.results.map((questions, index) =>
//   <QuestionsView questions={questions} key={index}
//   answerId={Object.keys(questions.answers)}
//   answers={questions.answers}/>
// )}
// {/* {this.state.questionList.results.map((questions, index) =>
// <QuestionsView questions={questions} key={index}
// answerId={Object.keys(questions.answers)}
// answers={questions.answers}/>
// )} */}
// {/* <button onClick={this.moreQuestionsClick}>More Answered Questions</button> */}

// if (this.props.searchList.length > 0) {
//   sortedQArray = this.props.searchList;
// } else {
//   sortedQArray = questionArray.sort(this.sortHelper);
// }
