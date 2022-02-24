import React , { useState, useEffect } from 'react';

function StarRating(props) {
  const[ratingsData, setData] = useState([]);
  const[rating, setRating] = useState(whichRating(ratingsData));

  function whichRating(array) {
    if (array) {
      var sum = 0;
      for (var i = 0; i < array.length; i++) {
        sum += array[i].rating;
      }
      return sum / array.length;
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
        <a>Reviews</a>
    </div>
  );

}

export default StarRating;