/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';
import ProductCard from './ProductCard.jsx';

function Carousel(props) {
  const { idsToRender, isOutfitList, overviewProductData } = props;

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
      {idsToRender.map((id) => (
        <ProductCard
          prodId={id}
          key={id}
          overviewProductData={overviewProductData}
        />
      ))}
    </>
  );
}

export default Carousel;
