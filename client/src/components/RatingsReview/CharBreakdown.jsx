/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

function CharBreakdown(props) {
  const { chars } = props;

  const containerStyles = {
    height: 10,
    width: '97%',
    backgroundColor: '#e0e0de',
    borderRadius: 3,
    margin: 2,
    float: 'left',
  };

  const fillerStyles = {
    position: 'relative',
    left: '40%',
    bottom: '10%',
    width: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid black',
    // backgroundColor: 'black',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div className="char-breakdown-bar" data-testid="CharBreakdown-1">
      {[...Array(5)].map((whatever, index) => (
        <div style={{ width: '17%' }} key={`${chars.id} ${index}`}>
          <div style={{
            position: 'relative', left: '40%', marginBottom: '5px', zIndex: '1',
          }}
          >
            {index + 1}
          </div>
          <div style={containerStyles}>
            <div style={Math.trunc(Number(chars.value)) === index + 1 ? fillerStyles : {}} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharBreakdown;
