/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';

function OutfitList(props) {
  // take in product ID from App.jsx as a prop
  const { renderedId } = props;
  const [relatedIds, setRelatedIds] = useState([]);



  // useEffect(() => {
  // }, []);

  return (
    <>
      <h3>My Outfit</h3>
      {/* <Carousel renderedIds={relatedIds} /> */}
      <Carousel renderedIds={['42368']} />
    </>
  );
}

export default OutfitList;
