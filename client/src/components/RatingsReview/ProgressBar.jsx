/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function ProgressBar(props) {
  const {
    bgcolor, completed, count, index, manageFilter,
  } = props;

  const [isActivated, setActivation] = useState(false);

  const containerStyles = {
    height: 15,
    width: '50%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    margin: 5,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  function activateSort() {
    setActivation(!isActivated);
  }

  return (
    <div>
      <button
        style={isActivated ? { color: 'blue' } : {}}
        className="star-filter-button"
        type="button"
        onClick={() => {
          activateSort();
          manageFilter(index, isActivated);
        }}
      >
        {index}
        {' '}
        star
      </button>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
      <div>
        {count || 0}
        {count === '1' ? ' rating' : ' ratings'}
      </div>
    </div>
  );
}

export default ProgressBar;
