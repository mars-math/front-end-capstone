import React from 'react';
import QuestionsView from './QuestionsView.jsx';
import sampleData from './QAdata/sampleData.js';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      moreQuestions: false,
      questionList: sampleData
    }

  }

  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <div>
        {console.log('questionList ', this.state.questionList.results)}
        {this.state.questionList.results.map((questions, index) =>
          <QuestionsView questions={questions} key={index}
          answerId={Object.keys(questions.answers)}
          answers={questions.answers}/>
        )}
        <button>More Answered Questions</button>
        <button>Add a Question</button>
      </div>
    );
  }

}

export default Questions;
// {console.log('questionList ', this.state.questionList.results)}
