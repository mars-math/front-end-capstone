/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';
import Carousel from 'react-multi-carousel';
import ProductCard from './ProductCard.jsx';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CardCarousel(props) {
  const {
    idsToRender, isOutfitList, overviewProductData, removeProduct,
  } = props;

  if (isOutfitList) {
    return (
      <Carousel
        responsive={responsive}
        autoPlay={false}
        shouldResetAutoplay={false}
      >
        {idsToRender.map((id) => (
          <ProductCard
            prodId={id}
            key={id}
            isOutfitList={isOutfitList}
            removeProduct={removeProduct}
          />
        ))}
      </Carousel>
    );
  }
  return (
    <Carousel
      responsive={responsive}
      autoPlay={false}
      shouldResetAutoplay={false}
    >
      {idsToRender.map((id) => (
        <ProductCard
          prodId={id}
          key={id}
          isOutfitList={isOutfitList}
          overviewProductData={overviewProductData}
        />
      ))}
    </Carousel>
  );
}

export default CardCarousel;
