import React from 'react';
import IndividualReview from './RatingsReview/IndividualReview.jsx'

import ProductDetail from './Overview/SM-ProductDetail.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Kloth</h1>
        <ProductInfo />
      </>
    );
  }

}





export default App;