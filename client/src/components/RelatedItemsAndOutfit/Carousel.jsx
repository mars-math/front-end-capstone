/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';
import ProductCard from './ProductCard.jsx';

function Carousel(props) {
  const {
    idsToRender, isOutfitList, overviewProductData, removeProduct,
  } = props;

  if (isOutfitList) {
    return (
      <>
        {idsToRender.map((id) => (
          <ProductCard
            prodId={id}
            key={id}
            isOutfitList={isOutfitList}
            removeProduct={removeProduct}
          />
        ))}
      </>
    );
  }
  return (
    <>
      {idsToRender.map((id) => (
        <ProductCard
          prodId={id}
          key={id}
          isOutfitList={isOutfitList}
          overviewProductData={overviewProductData}
        />
      ))}
    </>
  );
}

export default Carousel;
