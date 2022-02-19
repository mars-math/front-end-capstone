import React from 'react';
import QandA from './QandA/QandA.jsx';
import AllReviews from './RatingsReview/AllReviews.jsx';
import ProductInfo from './Overview/SM-ProductInfo.jsx';
import RelatedItems from './RelatedItemsAndOutfit/RelatedItems.jsx';
import OutfitList from './RelatedItemsAndOutfit/OutfitList.jsx';
import Overview from './Overview/SM-Overview.jsx';
import RatingBreakdown from './RatingsReview/RatingBreakdown.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Kloth</h1>
        <Overview />
        <RatingBreakdown />
        <RelatedItems renderedId={'42368'}/>
        <OutfitList /> {/* pass in a prop from the window.LocalStorage object*/}
        <div>
          <QandA />
        </div>
        <AllReviews />
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
