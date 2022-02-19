import React from 'react';

function ProgressBar(props) {
  const { bgcolor, completed } = props;

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

  return (
    <div>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
    </div>
  );
}

export default ProgressBar;
