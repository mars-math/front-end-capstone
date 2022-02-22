/* eslint-disable comma-dangle */
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
  const [imageUrl, setImageUrl] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

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

  const getProdInfo = (productID) => (
    axios.get(`/products/${productID}`)
      .then((response) => {
        const {
          id, name, category, default_price, features,
        } = response.data;
        setProdInfo({
          id,
          name,
          category,
          default_price,
          features
        });
      })
      .catch((err) => console.log(err))
  );

  const getSalePriceAndImg = (productID) => (
    axios.get(`/products/${productID}/styles`)
      .then((response) => {
        const totalStyles = response.data.results.length;
        for (let i = 0; i < totalStyles; i++) {
          const isDefault = response.data.results[i]['default?'];
          const onSalePrice = response.data.results[i].sale_price;
          const thumbnailUrl = response.data.results[i].photos[0].thumbnail_url;
          if (isDefault && onSalePrice) {
            setSalePrice(onSalePrice);
          }
          if (isDefault) {
            setImageUrl(thumbnailUrl);
          }
        }
        if (imageUrl === '') {
          setImageUrl(response.data.results[0].photos[0].thumbnail_url);
        }
      })
      .catch((err) => console.log(err))
  );

  const getReviewMetadata = (productID) => (
    axios.get('/reviews/meta', {
      params: {
        product_id: productID
      },
    })
      .then((response) => {
        setProdRating(calcAvgRtg(response.data.ratings));
      })
      .catch((err) => console.log(err))
  );

  const getAllProductData = (productID) => (
    getProdInfo(productID)
      .then(getSalePriceAndImg(productID))
      .then(getReviewMetadata(productID))
      .catch((err) => console.log(err))
  );

  useEffect(() => {
    getAllProductData(prodId);
  }, []);

  return (
    <span>
      <img src={imageUrl} alt="Product Preview" />
      <button type="button" onClick={toggleComparison}>Comparison Modal</button>
      <div>{`Product ID: ${prodInfo.id}`}</div>
      <div>{`Name: ${prodInfo.name}`}</div>
      <div>{`Category: ${prodInfo.category}`}</div>
      <div>{`Price: ${prodInfo.default_price}`}</div>
      <div>{`Sale Price: ${salePrice}`}</div>
      <div>{`Rating: ${prodRating}`}</div>
      {showComparison
        && <div>this is conditionally rendered</div>}
      {/* button to trigger display for comparison module.
      will need to make another comparison module component
      and have it render here based on some logic */}
    </span>
  );
}

export default ProductCard;
