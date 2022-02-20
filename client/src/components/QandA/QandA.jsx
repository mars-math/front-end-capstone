import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import axios from 'axios';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      searchList: [],
    }


  }

  componentDidMount() {
    // getQuestions();
  }

  // getQuestions() {
    // axios.get('')
    //   .then((response) => {
    //     this.setState({questionsList: response.questions}))
    //   .catch((err) => {
    //     console.log('error ', err)
    //   })
  // }


  render() {
    return (
      <>
        <h3>Questions &amp; Answers</h3>
        <div>
          <Search questionsList={this.state.questionsList} searchList={this.state.searchList}/>
        </div>
        <div>
          {/* <Questions questionsList={this.state.questionsList} searchList={this.state.searchList}/> */}
        </div>
      </>
    );
  }

}

export default QandA;