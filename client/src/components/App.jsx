import React from 'react';
import QandA from './QandA/QandA.jsx';
import AllReviews from './RatingsReview/AllReviews.jsx';
import Overview from './Overview/SM-Overview.jsx';
import Carousel from './RelatedItemsAndOutfit/Carousel.jsx';
import RatingBreakdown from './RatingsReview/RatingBreakdown.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <RatingBreakdown />
        {/* <h1>Kloth</h1>
        <ProductInfo />
        <h1>Kloth</h1>
        <Overview />
        <Carousel renderedId={'42368'}/>
        <Carousel />
        <div>
          <QandA />
        </div>
        <AllReviews /> */}
      </>
    );
  }
}

export default App;
