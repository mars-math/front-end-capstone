import React from 'react';
import IndividualReview from './RatingsReview/IndividualReview.jsx';
import QandA from './QandA/QandA.jsx';
import AllReviews from './RatingsReview/AllReviews.jsx';
import ProductInfo from './Overview/SM-ProductInfo.jsx';


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
        <AllReviews />
        <h1>Kloth</h1>
        <ProductInfo />
      </>
    );
  }

}





export default App;