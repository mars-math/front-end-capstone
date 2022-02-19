/* eslint-disable import/extensions */

import React from 'react';
import ProductCard from './ProductCard.jsx';

function Carousel(props) {
  const { renderedIds } = props;

  return (
    <>
      {renderedIds.map((id) => <ProductCard prodId={id} key={id} />)}
    </>
  );
  // return (<div>Hi from the Carousel component</div>);
}

export default Carousel;
