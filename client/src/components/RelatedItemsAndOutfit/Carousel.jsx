/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';
import ProductCard from './ProductCard.jsx';

function Carousel(props) {
  const { idsToRender, isOutfitList } = props;

  if (isOutfitList) {
    return (
      <>
        <div>THIS IS THE OUTFIT LIST</div>
        {idsToRender.map((id) => <ProductCard prodId={id} key={id} />)}
      </>
    );
  }
  return (
    <>
      <div>THIS IS THE RELATED ITEMS LIST</div>
      {idsToRender.map((id) => <ProductCard prodId={id} key={id} />)}
    </>
  );
  // return (<div>Hi from the Carousel component</div>);
}

export default Carousel;
