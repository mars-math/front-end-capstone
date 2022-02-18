/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';

function ProductCard({ prodId }) {
  // const prodId = '42370';

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
  }, [prodId]);

  return (
    <div>{prodInfo.name}</div>
  );
}

export default ProductCard;
