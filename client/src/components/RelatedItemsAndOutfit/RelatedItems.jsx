/* eslint-disable comma-dangle */
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

  const [prodInfo, setProdInfo] = useState({});
  const [salePrice, setSalePrice] = useState('');
  const [prodRating, setProdRating] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  const getRelatedIds = (productID) => {
    axios.get(`/products/${productID}/related`)
      .then((response) => {
        // const uniqueIDs = response.data.filter((prod, idx, arr) => arr.indexOf(prod));
        const uniqueIDs = response.data.filter((prod, idx, arr) => {
          if (arr.indexOf(prod) !== idx || prod.toString() === overviewId) {
            return false;
          }
          return prod;
        });
        setRelatedIds(uniqueIDs);
      })
      .catch((err) => console.log(err));
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
      .then(getRelatedIds(productID))
      .then(getSalePriceAndImg(productID))
      .then(getReviewMetadata(productID))
      .catch((err) => console.log(err))
  );

  useEffect(() => {
    getAllProductData(overviewId);
  }, []);

  return (
    <>
      <h3>Related Items</h3>
      <Carousel
        idsToRender={relatedIds}
        isOutfitList={false}
        overviewProductData={{
          prodInfo,
          salePrice,
          prodRating,
          imageUrl
        }}
      />
    </>
  );
}

export default RelatedItems;
