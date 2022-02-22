import React, { useEffect, useState } from 'react';

function Comparison(props) {
  const { overviewProductData, productCardData } = props;

  console.log(overviewProductData);
  console.log(productCardData);

  return (
    <div>this is the comparison module</div>
  );
}

export default Comparison;
