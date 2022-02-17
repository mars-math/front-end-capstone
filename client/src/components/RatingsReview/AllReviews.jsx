/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IndividualReview from './IndividualReview.jsx';
import API_KEY from '../../../../config/config.js';

export default function AllReviews() {
  const [amountToRender, setAmountToRender] = useState(2);
  const [renderedReviews, setRenderedReviews] = useState([]);

  function getReview(id, amount) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?count=${amount}&product_id=${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((results) => results.data)
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getReview(42366, amountToRender)
      .then((data) => {
        setRenderedReviews(data.results);
      })
      .catch((err) => console.log(err));
  }, [amountToRender]);

  return (
    renderedReviews.map((review, index) => <IndividualReview render={review} key={`review${index}`} />)
  );
}
