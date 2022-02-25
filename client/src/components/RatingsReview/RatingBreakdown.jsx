/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';
import Stars from './ratingexampledata/stars.js';
import ProgressBar from './ProgressBar.jsx';
import CharBreakdown from './CharBreakdown.jsx';

const {
  almostStar, quarterStar, halfStar, fullStar, emptyStar,
} = Stars;

export default function RatingBreakdown(props) {
  const [meta, setMeta] = useState({});

  const { manageFilter, url } = props;

  function getMeta(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((data) => data.data)
      .catch(((err) => console.log(err)));
  }

  useEffect(() => {
    getMeta(url)
      .then((data) => {
        setMeta(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function averageStars(ratingObj) {
    let total = 0;
    let count = 0;
    if (ratingObj) {
      Object.keys(ratingObj).map((key) => {
        total += Number(key) * ratingObj[key];
        count += Number(ratingObj[key]);
      });
    }
    return [(total / count).toFixed(1), count];
  }

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

  return (
    <>
      <div className="total-stars-render" id="reviewsJump">
        <div style={{ fontSize: '3em' }}>{averageStars(meta.ratings)[0]}</div>
        {[...Array(5)].map(
          (star, index) => <span key={`star${index}`}>{whichStar(averageStars(meta.ratings)[0], index)}</span>,
        )}
      </div>

      <div style={{
        fontSize: '1.4em', fontWeight: 'bold', marginBottom: '10px', marginTop: '10px',
      }}
      >
        {averageStars(meta.ratings)[1]}
        {' '}
        reviews
      </div>

      {meta.ratings ? [1, 2, 3, 4, 5].map((item, idx) => (
        <ProgressBar
          key={`progress bar ${idx}`}
          bgcolor="#50C878"
          completed={(((meta.ratings[item]
            ? meta.ratings[item] : 0) / averageStars(meta.ratings)[1]) * 100).toFixed()}
          count={meta.ratings[item]}
          index={item}
          manageFilter={manageFilter}
        />
      )) : <></>}

      {meta.characteristics ? Object.keys(meta.characteristics).map((char, index) => (
        <div key={`charBreak ${index}`} style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '5px', marginTop: '5px' }}>
            {char}
            :
          </h4>
          <CharBreakdown chars={meta.characteristics[char]} />
        </div>
      ))
        : <></>}
    </>
  );
}
