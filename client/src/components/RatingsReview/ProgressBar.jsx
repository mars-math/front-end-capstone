/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function ProgressBar(props) {
  const {
    bgcolor, completed, count, index, manageFilter,
  } = props;

  const [isActivated, setActivation] = useState(false);

  const containerStyles = {
    height: 15,
    width: '80%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    margin: 8,
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
    <div className="progress-bar" >
      <button
        style={isActivated ? { color: 'blue' } : {}}
        className="star-filter-button"
        type="button"
        onClick={() => {
          activateSort();
          manageFilter(index, isActivated);
        }}
        data-testid="progress-bar"
      >
        {index}
        {' '}
        star
      </button>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
      <div data-testid="progress-count">
        {count || 0}
      </div>
    </div>
  );
}

export default ProgressBar;
