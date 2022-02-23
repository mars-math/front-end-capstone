import React, { useEffect, useState } from 'react';

function Comparison(props) {
  const { overviewProductData, productCardData } = props;

  const parseDataObjs = (overview, product) => {
    const parsedData = [
      { name: [overview.prodInfo.name, product.prodInfo.name] },
      { category: [overview.prodInfo.category, product.prodInfo.category] },
      { price: [overview.prodInfo.default_price, product.prodInfo.default_price] },
      { rating: [overview.prodRating, product.prodRating] },
    ];

    for (let i = 0; i < overview.prodInfo.features.length; i++) {
      const { feature, value } = overview.prodInfo.features[i];
      parsedData.push({ [feature]: [value, null] });
    }

    for (let i = 0; i < product.prodInfo.features.length; i++) {
      const { feature, value } = product.prodInfo.features[i];
      const index = parsedData.findIndex((obj) => obj[feature] !== undefined);

      if (index === -1) {
        parsedData.push({ [feature]: [null, value] });
      } else {
        parsedData[index][feature].splice(1, 1, value);
      }
    }

    // console.log(Object.keys(parsedData[0])[0]);

    return parsedData;
  };

  const comparisonData = parseDataObjs(overviewProductData, productCardData);

  console.log(comparisonData);

  return (
    <>
      <div>this is the comparison module</div>
      <div>{null}</div>
    </>
  );
}

export default Comparison;

// const sampleObj = {
//   name: [overviewName, relatedName],
//   category: [overviewCategory, relatedCategory],
//   price: [overviewPrice, relatedPrice],
//   saleprice: [overviewSalePrice, relatedSalePrice],
//   feature1: [overviewValue, relatedValue],

// }
