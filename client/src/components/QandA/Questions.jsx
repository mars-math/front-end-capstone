import React from 'react';
import QuestionsView from './QuestionsView.jsx';
import sampleData from './QAdata/sampleData.js';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      moreQuestions: false,
      questionList: sampleData,
      sortedQuestions: []
    }

    this.moreQuestionsClick = this.moreQuestionsClick.bind(this);
  }

  sortHelper(a, b) {
    return parseInt(b.question_helpfulness) - parseInt(a.question_helpfulness);
  }


  showQuestions(questionL) {
    this.state.sortedAnswers = [];
    const questionArray = questionL;
    const sortedQArray = questionArray.sort(this.sortHelper);
    // console.log('sorted array ', sortedQArray);
    if (sortedQArray.length > 2 && this.state.moreQuestions === false) {
      return <>
        {sortedQArray.slice(0, 2).map((questions, index) =>
        <QuestionsView questions={questions} key={index}
        answerId={Object.keys(questions.answers)}
        answers={questions.answers}/>
        )}
      </>;
    } else if (sortedQArray.length > 0 && this.state.moreQuestions === true
    || sortedQArray.length > 0 && this.state.moreQuestions === false) {
      return <>
        {sortedQArray.map((questions, index) =>
        <QuestionsView questions={questions} key={index}
        answerId={Object.keys(questions.answers)}
        answers={questions.answers}/>
        )}
      </>;
    } else {
      return <></>;
    }
  }




  moreQuestionsClick() {
    this.setState({ moreQuestions: !this.state.moreQuestions});
  }

  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <div>
        {this.showQuestions(this.state.questionList.results)}

        <button onClick={this.moreQuestionsClick}>More Answered Questions</button>
        <button>Add a Question</button>
      </div>
    );
  }

}

export default Questions;
// {console.log('questionList ', this.state.questionList.results)}
// {console.log('questionList.results ', this.state.questionList.results)}

// {this.state.questionList.results.map((questions, index) =>
//   <QuestionsView questions={questions} key={index}
//   answerId={Object.keys(questions.answers)}
//   answers={questions.answers}/>
// )}