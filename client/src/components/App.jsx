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
<<<<<<< HEAD
      <div style={{fontFamily: 'StyreneA-Regular-Web'}}>
        <h1>Kloth</h1>
=======
      <>
        <h1 style={{marginLeft: '13%'}}>KLOTH</h1>
>>>>>>> a0585603158b20ad950a28a4b2dddb53cd69f5ff
        <Overview url={this.state.url} />
        <RelatedItems overviewId={this.state.url} />
        <OutfitList overviewId={this.state.url} />
        <AllReviews url={this.state.url} />
        <br />
        <div className="component-break">
          <QandA url={this.state.url} />
        </div>

      </div>
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
