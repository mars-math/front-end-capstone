import React from 'react';

function StarRating(props) {

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

  return (
    <div className="stars">
      {[...Array(5)].map(
        (star, index) =>
        <span key={`star-${index}`}>{whichStar(props.rating, index)}</span>
        )}
    </div>
  );

}

export default StarRating;