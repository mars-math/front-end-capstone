import React from 'react';
import QandA from './QandA/QandA.jsx';
import AllReviews from './RatingsReview/AllReviews.jsx';
import ProductInfo from './Overview/SM-ProductInfo.jsx';
import CardCarousel from './RelatedItemsAndOutfit/CardCarousel.jsx';
import RelatedItems from './RelatedItemsAndOutfit/RelatedItems.jsx';
import OutfitList from './RelatedItemsAndOutfit/OutfitList.jsx';
import Overview from './Overview/SM-Overview.jsx';
import RatingBreakdown from './RatingsReview/RatingBreakdown.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.pathname.slice(8).replaceAll('/', ''),
    };
  }

  render() {
    return (
      <>
        <h1>Kloth</h1>
        <Overview url={this.state.url} />
        <RelatedItems overviewId={this.state.url} />
        <OutfitList overviewId={this.state.url} />
        <AllReviews url={this.state.url} />
        <div>
          <QandA url={this.state.url} />
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
