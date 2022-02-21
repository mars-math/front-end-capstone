/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import IndividualReview from './IndividualReview.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import API_KEY from '../../../../config/config.js';
import WriteReview from './WriteReview.jsx';

export default function AllReviews() {
  const [amountToRender, setAmountToRender] = useState(2);
  const [renderedReviews, setRenderedReviews] = useState([]);
  const [filterStars, setFilterStars] = useState({});
  const slicedRender = renderedReviews.slice(0, amountToRender);
  const isFirstRender = useRef(true);

  function getReview(id, amount) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?count=${amount}&product_id=${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((results) => results.data)
      .catch((err) => console.log(err));
  }

  const manageFilter = (star, currentState) => {
    if (!currentState) {
      setFilterStars({
        ...filterStars,
        [star]: star,
      });
    } else {
      const newFilter = { ...filterStars };
      delete newFilter[star];
      setFilterStars(newFilter);
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      getReview(43230, 999)
        .then((data) => {
          setRenderedReviews(data.results.filter((review) => {
            const arrStars = Object.keys(filterStars);
            if (arrStars.length === 0) {
              return true;
            }
            for (let i = 0; i < arrStars.length; i += 1) {
              if (review.rating === Number(arrStars[i])) {
                return true;
              }
            }
            return false;
          }));
        });
    } else {
      isFirstRender.current = false;
    }
  }, [filterStars]);

  useEffect(() => {
    getReview(43230, 999)
      .then((data) => data.results.sort((a, b) => -a.date.localeCompare(b.date)))
      .then((results) => {
        setRenderedReviews(results);
      })
      .catch((err) => console.log(err));
  }, []);

  function sortReviews(e) {
    if (e.target.value === 'most recent') {
      const renderByDate = [...renderedReviews];
      renderByDate.sort((a, b) => -a.date.localeCompare(b.date));
      setRenderedReviews(renderByDate);
    } else {
      const renderByHelpful = [...renderedReviews];
      renderByHelpful.sort((a, b) => b.helpfulness - a.helpfulness);
      setRenderedReviews(renderByHelpful);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>{`${renderedReviews.length} reviews, sorted by`}</div>
        <select onChange={(e) => sortReviews(e)}>
          <option value="most recent">most recent</option>
          <option value="most helpful">most helpful</option>
        </select>
      </div>
      <div style={{ maxHeight: '850px', overflow: 'auto' }}>
        {slicedRender.map((review, index) => <IndividualReview render={review} key={`review${index}`} />)}
        {renderedReviews.length >= 2 && slicedRender.length < renderedReviews.length ? <button type="button" onClick={() => setAmountToRender((prevNum) => prevNum + 2)}>More Reviews</button> : <></>}
        <WriteReview />
      </div>
      <RatingBreakdown manageFilter={manageFilter} />
    </div>

  );
}
