import React , { useState, useEffect } from 'react';

const reviewStyle = {
  fontSize: '10px',
  color: 'rgb(146, 130, 85)'
}

function StarRating(props) {
  const[ratingsData, setData] = useState({});
  const[rating, setRating] = useState(whichRating(ratingsData));

  function whichRating(obj) {
    if (obj) {
      var sum = 0;
      var reviewCount = 0;
      for (var i in obj) {
        let addto = i * parseInt(obj[i]);
        sum += addto;
        reviewCount += parseInt(obj[i]);
      }
      let avgRating = sum / reviewCount;
      return Number(avgRating.toFixed(1));
    }
    return 0;
  }

  function whichStar(rating, index) {
    if (rating >= index + 1) {
      return props.stars.fullStar;
    } else {
      if (rating === (index + 0.5) || (rating > index + 0.33 && rating < index + 0.66)) {
        return props.stars.halfStar;
      }
      if (rating <= index + 0.33 && rating > index) {
        return props.stars.quarterStar;
      }
      if (rating >= index + 0.66) {
        return props.stars.almostStar;
      }
      return props.stars.emptyStar;
    }
  }

  useEffect(() => setData(props.ratings));
  useEffect(() => setRating(whichRating(props.ratings)), [ratingsData]);

  return (
    <div className="stars">
      {[...Array(5)].map(
        (star, index) =>
        <span key={`star-${index}`}>{whichStar(rating, index)}</span>
        )}
        <a style={reviewStyle}
        href="#reviewsJump">Reviews</a>
    </div>
  );

}

export default StarRating;