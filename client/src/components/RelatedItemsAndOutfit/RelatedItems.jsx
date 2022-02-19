/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import API_KEY from '../../../../config/config.js';

function RelatedItems(props) {
  // take in product ID from App.jsx as a prop
  const { renderedId } = props;
  const [relatedIds, setRelatedIds] = useState([]);

  // state for list of all related items from a product ID
  // state for index

  const getRelatedIds = (id) => {
    axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
    axios.defaults.headers.common.Authorization = API_KEY;
    return (
      axios.get(`/products/${id}/related`)
        .then((response) => {
          setRelatedIds(response.data);
        })
        .catch((err) => console.log('MT error: ', err))
    );
  };

  useEffect(() => {
    getRelatedIds(renderedId);
  }, []);

  return (
    <>
      <h3>Related Items</h3>
      <Carousel renderedIds={relatedIds} />
    </>
  );
}

export default RelatedItems;
