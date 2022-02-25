import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

import ProductInfo from './SM-ProductInfo.jsx';
import StyleSelector from './SM-StyleSelector.jsx';

export default function Overview(props) {
  const [productData, setProductData] = useState([]);
  const [stylesData, setStylesData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  function getData(url) {
    axios.defaults.headers.common['Authorization'] = API_KEY;

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${url}/`)
      .then(res => setProductData(res.data))
      .catch(err => console.log('error product data', err));

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${url}/styles`)
      .then(res => setStylesData(res.data))
      .catch(err => console.log('error styles data', err))

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${url}`)
      .then(res => setReviewsData(res.data))
      .catch(err => console.log('error reviews data', err))
  }

  useEffect(() =>
    getData(props.url), []);


  if (!Object.keys(productData).length
    || !Object.keys(stylesData).length
    || !Object.keys(reviewsData).length) {
    return (
      <div>loading</div>
    );
  }

  return (
    <div className='overview-container'>
      <div className='right-container'>
        <ProductInfo productData={productData} reviewsData={reviewsData.ratings} />
      </div>
      <div className='left-container'>
        <StyleSelector stylesData={stylesData.results} />
      </div>
    </div>

  );

}
