import React from 'react';
import AllReviews from './RatingsReview/AllReviews.jsx';
import ProductInfo from './Overview/SM-ProductInfo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <AllReviews />
        <h1>Kloth</h1>
        <ProductInfo />
      </>
    );
  }

}





export default App;