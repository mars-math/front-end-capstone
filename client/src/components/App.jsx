import React from 'react';
import IndividualReview from './RatingsReview/IndividualReview.jsx'
import AllReviews from './RatingsReview/AllReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <AllReviews />
        <h1>HELLO</h1>
        <div>something else</div>
        <div>sfaasf</div>
        <h2>CONFLICTERS?</h2>
      </>
    );
  }

}





export default App;