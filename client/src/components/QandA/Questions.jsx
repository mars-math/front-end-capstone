import React from 'react';
import QuestionsView from './QuestionsView.jsx';
import sampleData from './QAdata/sampleData.js';


class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      questionList: sampleData
    }

  }

  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <div>
        {console.log('questionList ', this.state.questionList.results)}
        {this.state.questionList.results.map((questions, index) =>
          <QuestionsView questions={questions} key={index}/>
        )}
        <button>More Answered Questions</button>
        <button>Add a Question</button>
      </div>
    );
  }

}

export default Questions;



// import React from 'react';
// import QuestionsView from './QuestionsView.jsx';
// // check font awesome for search icon?

// class Questions extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchText: '',
//       questionList: ''
//     }

//   }
//   // render the questions that correspond to the item chosen
//   render() {
//     return (
//       <div>
//         <div>
//           <QuestionsView />
//         </div>
//       </div>
//     );

//   }

// }

// export default Questions;