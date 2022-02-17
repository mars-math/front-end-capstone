import React from 'react';
import IndividualReview from './RatingsReview/IndividualReview.jsx'

import ProductInfo from './Overview/SM-ProductInfo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Kloth</h1>
        <ProductInfo />
        <IndividualReview />
      </>
    );
  }

}





export default App;