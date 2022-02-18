/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

// style ID 42372 does not have a default style
// style ID 42380 has a sale price for a non-default style

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

function ProductCard(props) {
  const { prodId } = props;
  const [prodInfo, setProdInfo] = useState({});
  const [salePrice, setSalePrice] = useState('');
  const [prodRating, setProdRating] = useState(null);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  const calcAvgRtg = (rtgObj) => {
    let totalStars = 0;
    let totalRtgs = 0;

    Object.entries(rtgObj).forEach((rating) => {
      const stars = Number(rating[0]) * Number(rating[1]);
      totalRtgs += Number(rating[1]);
      totalStars += stars;
    });

    const avgRtg = totalStars / totalRtgs;

    return (Number(avgRtg.toFixed(2)));
  };

  const getProdInfo = (id) => (
    axios.get(`/products/${id}`)
      .then((response) => {
        setProdInfo(response.data);
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getSalePrice = (id) => (
    axios.get(`/products/${id}/styles`)
      .then((response) => {
        const totalStyles = response.data.results.length;
        for (let i = 0; i < totalStyles; i++) {
          const isDefault = response.data.results[i]['default?'];
          const { sale_price } = response.data.results[i];
          if (isDefault && sale_price) {
            setSalePrice(sale_price);
            return;
          }
        }
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getReviewData = (id) => (
    axios.get('/reviews/meta', {
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        // { '1', '2', '3', '4', '5' } = response.data.ratings;
        // console.log('this is the meta data: ', Object.entries(response.data.ratings));
        setProdRating(calcAvgRtg(response.data.ratings));
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getAllProductData = (id) => (
    getProdInfo(id)
      .then(getSalePrice(id))
      .then(getReviewData(id))
      .catch((err) => console.log('MT error: ', err))
  );

  useEffect(() => {
    getAllProductData(prodId);
  }, []);

  return (
    <span>
      <div>{`Product ID: ${prodInfo.id}`}</div>
      <div>{`Name: ${prodInfo.name}`}</div>
      <div>{`Category: ${prodInfo.category}`}</div>
      <div>{`Sale Price: ${salePrice}`}</div>
      <div>{`Rating: ${prodRating}`}</div>
    </span>
  );
}

export default ProductCard;

// Category
// Name
// Price of default style
// Discount status
// Star rating
// Primary image - 'This should be the same which first appears on the image detail page’s image gallery'
