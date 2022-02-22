/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import API_KEY from '../../../../config/config.js';

function RelatedItems(props) {
  // take in product ID from App.jsx as a prop
  const { overviewId } = props;
  const [relatedIds, setRelatedIds] = useState([]);

  const [overviewProdInfo, setProdInfo] = useState({});
  const [overviewSalePrice, setSalePrice] = useState('');
  const [overviewProdRating, setProdRating] = useState(null);
  const [overviewImageUrl, setImageUrl] = useState('');

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  const getRelatedIds = (id) => {
    axios.get(`/products/${id}/related`)
      .then((response) => {
        setRelatedIds(response.data);
      })
      .catch((err) => console.log('MT error: ', err));
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

  const getProdInfo = (id) => (
    axios.get(`/products/${id}`)
      .then((response) => {
        setProdInfo(response.data);
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getSalePriceAndImg = (id) => (
    axios.get(`/products/${id}/styles`)
      .then((response) => {
        const totalStyles = response.data.results.length;
        for (let i = 0; i < totalStyles; i++) {
          const isDefault = response.data.results[i]['default?'];
          const onSalePrice = response.data.results[i].sale_price;
          const thumbnailUrl = response.data.results[i].photos[0].thumbnail_url;
          if (isDefault && onSalePrice) {
            setSalePrice(onSalePrice);
            return;
          }
          if (isDefault) {
            setImageUrl(thumbnailUrl);
          }
        }
        if (imageUrl === '') {
          setImageUrl(response.data.results[0].photos[0].thumbnail_url);
        }
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getReviewMetadata = (id) => (
    axios.get('/reviews/meta', {
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        setProdRating(calcAvgRtg(response.data.ratings));
      })
      .catch((err) => console.log('MT error: ', err))
  );

  const getAllProductData = (id) => (
    getProdInfo(id)
      .then(getSalePriceAndImg(id))
      .then(getReviewMetadata(id))
      .catch((err) => console.log('MT error: ', err))
  );

  useEffect(() => {
    getRelatedIds(overviewId);
  }, []);

  return (
    <>
      <h3>Related Items</h3>
      <Carousel idsToRender={relatedIds} isOutfitList={false} />
    </>
  );
}

export default RelatedItems;
