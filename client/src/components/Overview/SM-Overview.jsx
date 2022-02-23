import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

import ProductInfo from './SM-ProductInfo.jsx';
import StyleSelector from './SM-StyleSelector.jsx';




export default function Overview(props) {
  const[productData, setProductData] = useState([]);
  const[stylesData, setStylesData] = useState([]);
  const[reviewsData, setReviewsData] = useState([]);

  function getData(url) {
    axios.defaults.headers.common['Authorization'] = API_KEY;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${url}/`)
    .then(res => setProductData(res.data))
    .then(
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${url}/styles`)
      .then(res => setStylesData(res.data))
      .catch(err => console.log('error styles data', err))
    )
    .then(
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${url}`)
      .then(res => setReviewsData(res.data))
      .catch(err => console.log('error reviews data', err))
    )
    .catch(err => console.log('error fetching both data', err))
  }

  useEffect(() =>
    getData(props.url), []);

  return (
    <div className='overview-container'>
          <div className='right-container'>
            <ProductInfo productData={productData} reviewsData={reviewsData.results}/>
          </div>
          <div className='left-container'>
            <StyleSelector stylesData={stylesData}/>
          </div>
    </div>

  );

}
