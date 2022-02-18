/* eslint-disable import/extensions */

import React from 'react';
import ProductCard from './ProductCard.jsx';
import SampleData from './sampledata/sampledata.js';

function Carousel() {
  // take in product ID
  return (
    <>
      <h3>Related Items</h3>
      {SampleData.relatedIDs.map((id) => <ProductCard prodId={id} key={id} />)}
    </>
  );
  // return (<div>Hi from the Carousel component</div>);
}

export default Carousel;
