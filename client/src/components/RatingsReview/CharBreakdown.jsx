import React from 'react';

function CharBreakdown(props) {
  const { chars } = props;

  console.log(Math.trunc(Number(chars.value)));

  const containerStyles = {
    // display: 'inline-flex',
    height: 15,
    width: '5%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    margin: 2,
    float: 'left',
  };

  const fillerStyles = {
    position: 'relative',
    left: '45%',
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
    <div>
      {[...Array(5)].map((whatever, index) => (
        <div style={{}}>
          <div style={{ float: 'left' }}>{index + 1}</div>
          <div style={containerStyles}>
            <div style={Math.trunc(Number(chars.value)) === index + 1 ? fillerStyles : {}} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharBreakdown;
