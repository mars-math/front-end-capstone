import React from 'react';
import icons from './SM-icons.js';


const { fb, twitter, pinterest } = icons;

const buttonStyle = {
  width: '25px',
  height: '25px',
  borderRadius: 100,
};

function Share(props) {
  return (
    <div>
      Share
      <a style={buttonStyle} href="https://www.facebook.com/share">F</a>
      <button style={buttonStyle}>tw</button>
      <button style={buttonStyle}>pt</button>
    </div>
  );
}

export default Share;
