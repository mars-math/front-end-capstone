/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

// style ID 42372 does not have a default style
// style ID 42380 has a sale price for a non-default style
// 43460 no related items?
// 43230 and 43051 have sale prices

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import API_KEY from '../../../../config/config.js';
import Comparison from './Comparison.jsx';

import Stars from '../RatingsReview/ratingexampledata/stars.js';

const {
  almostStar, quarterStar, halfStar, fullStar, emptyStar,
} = Stars;

function ProductCard(props) {
  const {
    overviewId, prodId, overviewProductData, isOutfitList, removeProduct,
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
    <>
      {/* {(overviewId === prodId)
        && (
          <Card sx={{ border: 1, height: '80%' }}>
            test card
          </Card>
        )} */}
      {/* {(overviewId !== prodId)
        && ( */}
      {showComparison
        && (
          <div className="popup-box-product-card" data-testid="comparison">
            <div className="box">
              {/* <button type="button" className="close-icon" onClick={toggleComparison}>x</button> */}
              <span className="close-icon" onClick={toggleComparison}>X</span>
              <Comparison
                overviewProductData={overviewProductData}
                productCardData={{
                  prodInfo,
                  salePrice,
                  prodRating,
                  imageUrl,
                }}
                toggleComparison={toggleComparison}
              />
            </div>
          </div>
        )}
      <div data-testid="prodCard">
        <Card sx={{ border: 1, height: '90%', zIndex: 1 }}>
          {!isOutfitList
            && (
              <button
                style={{
                  position: 'absolute',
                  left: '90%',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                type="button"
                onClick={toggleComparison}
                aria-label="Toggle Comparison"
              >
                {fullStar}
              </button>
            )}
          {isOutfitList
            && (
              <button
                style={{
                  position: 'absolute',
                  left: '92%',
                  // backgroundColor:
                  //   'transparent',
                  // border: 'none',
                  // fontSize: '3rem',
                  // fontWeight: 'bolder',
                }}
                type="button"
                data-id={prodInfo.id}
                onClick={removeProduct}
              >
                x
              </button>
            )}
          <a style={{ textDecoration: 'none' }} href={`http://localhost:3000/product/${prodId}/`}>
            <img src={imageUrl} alt="Product Preview" style={{ height: '70%', width: '100%' }} />
          </a>
          <p style={{ marginLeft: '0.5rem' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem', lineHeight: '1.5' }}>{prodInfo.name}</div>
            <div style={{ fontSize: '1rem', lineHeight: '1.5' }}>{prodInfo.category}</div>
            {!salePrice && (
              <div style={{ fontSize: '1rem', lineHeight: '1.5' }}>{prodInfo.default_price}</div>
            )}
            {salePrice && (
              <>
                <span style={{ color: 'red', fontSize: '1rem', lineHeight: '1.5' }}>{`${salePrice} `}</span>
                <s style={{ fontSize: '1rem', lineHeight: '1.5' }}>{prodInfo.default_price}</s>
              </>
            )}
            <div className="total-stars-render">
              {[...Array(5)].map(
                (star, index) => <span key={`star${index}`}>{whichStar(prodRating, index)}</span>,
              )}
              {/* <div style={{ fontSize: '1em' }}>{prodRating}</div> */}
            </div>
          </p>
        </Card>
      </div>
    </>
  );
}

export default ProductCard;
