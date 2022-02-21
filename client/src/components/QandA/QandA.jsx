import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';
import sampleData from './QAdata/sampleData.js';
import Questions from './Questions.jsx';
// check font awesome for search icon?

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      // questionList: sampleData,
      questionList: sampleData,
      searchList: [],
    };

    this.searchClick = this.searchClick.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount() {
    this.getItemInfo();
  }

  getItemInfo() {
    // switch to backtick when pulling from url
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=42369', {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((data) => {
        // console.log('data ', data);
        this.setState({ questionList: data.data });
        // console.log('qList imported ', this.state.questionList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // search text function
  searchChange(e) {
    if (e.target.value.length >= 3) {
      this.setState({ searchText: e.target.value });
    }
    if (e.target.value.length < 3) {
      while (this.state.searchList.length) {
        this.state.searchList.pop();
      }
      this.setState({searchList: this.state.searchList});
    }
    if (e.target.value.length === 0) {
      this.setState({ searchText: '' });
    }
    // console.log(this.state.searchText);
  }

  // click the search button function
  searchClick(e) {
    e.preventDefault();
    // loop to empty the search array for the next search
    while (this.state.searchList.length) {
      this.state.searchList.pop();
    }
    const questionL = this.state.questionList.results;
    // console.log('questionL ', questionL);
    for (let i = 0; i < questionL.length; i++) {
      if (questionL[i].question_body.includes(this.state.searchText)) {
        this.state.searchList.push(questionL[i]);
        this.setState({ searchList: this.state.searchList });
      }
    }
    this.setState({searchList: this.state.searchList});
    // console.log('props.searchList inside click ', this.state.searchList);
  }

  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <>
        <h3>Questions &amp; Answers</h3>
        <div>
          {/* {console.log('searchList ', this.state.searchList)} */}
          <form onSubmit={this.searchClick}>
            <input placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={this.searchChange} />
            <button type="submit">search</button>
          </form>
          <Questions searchList={this.state.searchList} questionList={this.state.questionList}/>
        </div>
      </>
    );
  }
}

export default QandA;
// {console.log('questionList ', this.state.questionList.results)}

// {/* {this.state.questionList.results.map((questions, index) =>
//   <SearchView questions={questions} key={index} />)} */}
