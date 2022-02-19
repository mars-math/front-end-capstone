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

  sortHelper(a,b) {
    return parseInt(b.question_helpfulness) - parseInt(a.question_helpfulness);
  }


  showQuestions(questionL) {
    this.state.sortedAnswers = [];
    console.log('questions list ', this.state.questionList);
    const questionArray = this.state.questionList.results;
    console.log('questions array ', questionArray);

    const sortedQArray = questionArray.sort(this.sortHelper);
    console.log('sorted array ', sortedQArray);

    // for (const k in answerList) {
    //   if (answerList[k].answerer_name === 'Seller') {
    //     this.state.sortedAnswers.unshift({k:answerList[k]});
    //   } else {
    //     this.state.sortedAnswers.push(({k:answerList[k]}));
    //   }
    // }
    if (this.state.sortedAnswers.length > 2 && this.state.moreAnswers === false) {
      return <>

      </>;
    } else if (this.state.sortedAnswers.length > 0 && this.state.moreAnswers === true
    || this.state.sortedAnswers.length > 0 && this.state.moreAnswers === false) {
      return <>

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

        {this.state.questionList.results.map((questions, index) =>
          <QuestionsView questions={questions} key={index}
          answerId={Object.keys(questions.answers)}
          answers={questions.answers}/>
        )}
        <button onClick={this.moreQuestionsClick}>More Answered Questions</button>
        <button>Add a Question</button>
      </div>
    );
  }

}

export default Questions;
// {console.log('questionList ', this.state.questionList.results)}
// {console.log('questionList.results ', this.state.questionList.results)}
