/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Stars from './ratingexampledata/stars.js';

const {
  fullStar, emptyStar,
} = Stars;

function StarRating(props) {
  const { buildPost } = props;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    buildPost('rating', rating);
  }, [rating]);

  return (
    <div className="star-rating" style={{ marginBottom: '10px', borderBottom: '1px solid black' }}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className="star-buttons"
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">{index <= (hover || rating) ? fullStar : emptyStar}</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
