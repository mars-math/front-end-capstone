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
        <IndividualReview />
        <h1>HELLO</h1>
        <ProductInfo />
        {/* <div>asfasfasfasfafs</div>
        <div>sfaasf</div>
        <h2>CONFLICTERS?</h2> */}
      </>
    );
  }

}





export default App;