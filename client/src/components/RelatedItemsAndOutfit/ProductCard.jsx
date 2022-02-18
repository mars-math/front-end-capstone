/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

function ProductCard(props) {
  // const prodId = '42370';
  const { prodId } = props;
  const [prodInfo, setProdInfo] = useState([]);

  const getProdInfo = (id) => {
    axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
    axios.defaults.headers.common.Authorization = API_KEY;
    return (
      axios.get(`/products/${id}`)
        .then((response) => {
          setProdInfo(response.data);
        })
        .catch((err) => console.log('MT error: ', err))
    );
  };

  useEffect(() => {
    getProdInfo(prodId);
  }, []);

  return (
    <span>
      <div>{`Name: ${prodInfo.name}`}</div>
      <div>{`Category: ${prodInfo.category}`}</div>
    </span>
  );
}

export default ProductCard;
