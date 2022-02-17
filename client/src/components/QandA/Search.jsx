import React from 'react';
import SearchView from './SearchView.jsx';
// check font awesome for search icon?

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      questionList: ''
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
  render() {
    return (
      <div>
        {console.log(this.state.searchText)}
        <form onSubmit={this.searchClick}>
          <input placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' onChange={this.searchChange}></input>
          <button type='submit'>search</button>
        </form>
        <SearchView />
      </div>
    );
  }

}



export default Search;