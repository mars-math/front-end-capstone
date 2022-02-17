import React from 'react';
import IndividualReview from './RatingsReview/IndividualReview.jsx';
import QandA from './QandA/QandA.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IndividualReview />
        <h1>HELLO</h1>
        <div>something else</div>
        <div>test
          <QandA />
        </div>
        <h2>CONFLICTERS?</h2>
      </>
    );
  }

}





export default App;