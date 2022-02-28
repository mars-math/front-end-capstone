/* eslint-disable react/prop-types */
import React from 'react';

function Comparison(props) {
  const { overviewProductData, productCardData, toggleComparison } = props;

  console.log(overviewProductData)
  console.log(productCardData)

  const parseDataObjs = (overview, product) => {
    const parsedData = [
      { Name: [overview.prodInfo.name, product.prodInfo.name] },
      { Category: [overview.prodInfo.category, product.prodInfo.category] },
      { Price: [overview.prodInfo.default_price, product.prodInfo.default_price] },
      { Rating: [overview.prodRating, product.prodRating] },
    ];

    for (let i = 0; i < overview.prodInfo.features.length; i += 1) {
      const { feature, value } = overview.prodInfo.features[i];
      parsedData.push({ [feature]: [value, null] });
    }

    for (let i = 0; i < product.prodInfo.features.length; i += 1) {
      const { feature, value } = product.prodInfo.features[i];
      const index = parsedData.findIndex((obj) => obj[feature] !== undefined);

      if (index === -1) {
        parsedData.push({ [feature]: [null, value] });
      } else {
        parsedData[index][feature].splice(1, 1, value);
      }
    }

    return parsedData;
  };

  const comparisonData = parseDataObjs(overviewProductData, productCardData);

  return (
    <div data-testid="compModal">
      <table>
        <thead>
          <tr>
            <th colSpan="3">Comparing</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((feature) => (
            <tr>
              <td>{feature[Object.keys(feature)[0]][0]}</td>
              <td>{Object.keys(feature)[0]}</td>
              <td>{feature[Object.keys(feature)[0]][1]}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><button type="button" onClick={toggleComparison}>close</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Comparison;
