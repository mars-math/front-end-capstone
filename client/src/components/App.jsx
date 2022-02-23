import React from 'react';
import QandA from './QandA/QandA.jsx';
import AllReviews from './RatingsReview/AllReviews.jsx';
import ProductInfo from './Overview/SM-ProductInfo.jsx';
import Carousel from './RelatedItemsAndOutfit/Carousel.jsx';
import RelatedItems from './RelatedItemsAndOutfit/RelatedItems.jsx';
import OutfitList from './RelatedItemsAndOutfit/OutfitList.jsx';
import Overview from './Overview/SM-Overview.jsx';
import RatingBreakdown from './RatingsReview/RatingBreakdown.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.pathname.replaceAll('/', ''),
    };
  }

  render() {
    return (
      <>
        <AllReviews url={this.state.url}/>
        {console.log(this.state.url)}
        {/* <h1>Kloth</h1>
        <ProductInfo /> */}
        {/* <Carousel renderedId={'42368'}/> */}
        <h1>Kloth</h1>
        <Overview />
        <RelatedItems overviewId="42368" />
        <OutfitList overviewId="42368" />
        <div>
          <QandA />
        </div>
      </>
    );
  }
}

export default App;

/*
1. Overview
2. Reviews
3. Q&A
4. Related/Outfit
*/
