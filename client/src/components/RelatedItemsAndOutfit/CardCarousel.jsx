/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';
import Carousel from 'react-multi-carousel';
import ProductCard from './ProductCard.jsx';
import Card from '@mui/material/Card';
// import 'react-multi-carousel/lib/styles.css';
import { Box, flexbox } from '@mui/system';

const responsive = {
  // superLargeDesktop: {
  //   // the naming can be any, depends on you.
  //   breakpoint: { max: 3000, min: 2200 },
  //   items: 5,
  // },
  meddesktop: {
    breakpoint: { max: 2200, min: 1600 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
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
    overviewId, idsToRender, isOutfitList, overviewProductData, removeProduct, addToOutfit,
  } = props;

  if (isOutfitList) {
    const concatArr = [overviewId].concat(idsToRender);
    return (
      // {/* <Card>
      //   <button type="button" onClick={addToOutfit}>Add to My Outfit</button>
      // </Card> */}
      <Carousel
        responsive={responsive}
        autoPlay={false}
        shouldResetAutoplay={false}
        containerClass="react-multi-carousel-max-width"
        sliderClass="react-multi-carousel-track-modified"
        // partialVisible
        itemClass="carousel-item"
      >
        {/* {concatArr.map((id) => ( */}
        {idsToRender.map((id) => (
          <ProductCard
            overviewId={overviewId}
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
      containerClass="react-multi-carousel-max-width"
      sliderClass="react-multi-carousel-track-modified"
      // partialVisible
      itemClass="carousel-item"
    >
      {idsToRender.map((id) => (
        <ProductCard
          overviewId={overviewId}
          prodId={id}
          key={id}
          isOutfitList={isOutfitList}
          overviewProductData={overviewProductData}
        />
      ))}
      {/* </Box> */}
    </Carousel>
  );
}

export default CardCarousel;
