import React from 'react';
import SearchView from './SearchView.jsx';
import sampleData from './QAdata/sampleData.js';
// check font awesome for search icon?

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      questionList: sampleData
    }

    this.searchClick = this.searchClick.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }
  // search text function
  searchChange(e) {
    this.setState({searchText: e.target.value});
  }

  // click the search button function
  searchClick(e) {
    // check the question data for partial matches after 3 characters
    // only display the partial matches
    // axios.get('')
      // .then ((response) => {
      //   this.setState({questionList: response.questions})
      // })
  }
  // render the questions that correspond to what was entered in the serach field
  render() {
    return (
      <div>
        {/* {console.log('questionList ', this.state.questionList.results)} */}
        <form onSubmit={this.searchClick}>
          <input placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' onChange={this.searchChange}></input>
          <button type='submit'>search</button>
        </form>
        {this.state.questionList.results.map((questions, index) =>
          <SearchView questions={questions} key={index}/>
        )}
      </div>
    );
  }

}



export default Search;