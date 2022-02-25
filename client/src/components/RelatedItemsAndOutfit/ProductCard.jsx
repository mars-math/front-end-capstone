/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

// style ID 42372 does not have a default style
// style ID 42380 has a sale price for a non-default style
// 43460 no related items?
// 43230 and 43051 have sale prices

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { display } from '@mui/system';
import API_KEY from '../../../../config/config.js';
import Comparison from './Comparison.jsx';

import Stars from '../RatingsReview/ratingexampledata/stars.js';

const {
  almostStar, quarterStar, halfStar, fullStar, emptyStar,
} = Stars;

function ProductCard(props) {
  const {
    prodId, overviewProductData, isOutfitList, removeProduct,
  } = props;
  const [prodInfo, setProdInfo] = useState({});
  const [salePrice, setSalePrice] = useState(null);
  const [prodRating, setProdRating] = useState(null);
  const [imageUrl, setImageUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
  const [showComparison, setShowComparison] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
  axios.defaults.headers.common.Authorization = API_KEY;

  function whichStar(rating, index) {
    if (rating >= index + 1) {
      return fullStar;
    }
    if (rating === (index + 0.5) || (rating > index + 0.33 && rating < index + 0.66)) {
      return halfStar;
    }
    if (rating <= index + 0.33 && rating > index) {
      return quarterStar;
    }
    if (rating >= index + 0.66) {
      return almostStar;
    }
    return emptyStar;
  }

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

    return (Number(avgRtg.toFixed(1)));
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
          features,
        });
      })
      .catch((err) => console.log(err))
  );

  const getSalePriceAndImg = (productID) => (
    axios.get(`/products/${productID}/styles`)
      .then((response) => {
        const totalStyles = response.data.results.length;
        const firstThumbnailUrl = response.data.results[0].photos[0].thumbnail_url;
        for (let i = 0; i < totalStyles; i += 1) {
          const isDefault = response.data.results[i]['default?'];
          const onSalePrice = response.data.results[i].sale_price;
          const thumbnailUrl = response.data.results[i].photos[0].thumbnail_url;
          if (isDefault) {
            if (onSalePrice) {
              setSalePrice(onSalePrice);
            }
            if (thumbnailUrl) {
              setImageUrl(thumbnailUrl);
            }
          }
        }
        if (firstThumbnailUrl) {
          setImageUrl(firstThumbnailUrl);
        }
      })
      .catch((err) => console.log(err))
  );

  const getReviewMetadata = (productID) => (
    axios.get('/reviews/meta', {
      params: {
        product_id: productID,
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

  // ?w=200&h=200&fit=crop&auto=format`

  return (
    <Card sx={{ border: 1, height: '80%' }}>
      {/* <> */}
      <img src={imageUrl} alt="Product Preview" style={{ height: '70%', width: '100%' }} />
      {!isOutfitList
        && (
          <button type="button" onClick={toggleComparison}>Comparison Modal</button>
        )}
      {isOutfitList
        && (
          <button type="button" data-id={prodInfo.id} onClick={removeProduct}>Remove Item</button>
        )}
      <div style={{ marginLeft: '1rem' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', lineHeight: '1.5' }}>{prodInfo.name}</div>
        <div style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>{prodInfo.category}</div>
        {!salePrice && (
          <div style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>{prodInfo.default_price}</div>
        )}
        {salePrice && (
          <>
            <span style={{ color: 'red', fontSize: '1.25rem', lineHeight: '1.5' }}>{`${salePrice} `}</span>
            <s style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>{prodInfo.default_price}</s>
          </>
        )}
        <div className="total-stars-render">
          {[...Array(5)].map(
            (star, index) => <span key={`star${index}`}>{whichStar(prodRating, index)}</span>,
          )}
          {/* <div style={{ fontSize: '1em' }}>{prodRating}</div> */}
        </div>
      </div>

      {showComparison
        && (
          <Comparison
            overviewProductData={overviewProductData}
            productCardData={{
              prodInfo,
              salePrice,
              prodRating,
              imageUrl,
            }}
          />
        )}
      {/* button to trigger display for comparison module.
      will need to make another comparison module component
      and have it render here based on some logic */}
      {/* </> */}
    </Card>
  );
}

export default ProductCard;
