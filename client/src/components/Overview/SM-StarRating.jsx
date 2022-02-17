import React from 'react';

function StarRating(props) {
  return (
    <div className="stars">
      {props.rating}
    </div>
  );

}

export default StarRating;