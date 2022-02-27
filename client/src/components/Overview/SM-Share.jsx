import React from 'react';
import icons from './SM-icons.js';


const { fb, twitter, pinterest } = icons;

const buttonStyle = {
  width: '15px',
  height: '15px',
  borderRadius: 100,
  padding: '5px 5px 5px 5px'
};

function Share(props) {
  return (
    <div>
      <a href="https://www.facebook.com/share">
        <img style={buttonStyle} src={fb} alt="facebook" />
      </a>
      <a href="https://www.facebook.com/share">
        <img style={buttonStyle} src={twitter} alt="twitter" />
      </a>
      <a href="https://www.facebook.com/share">
        <img style={buttonStyle} src={pinterest} alt="pinterest" />
      </a>

    </div>
  );
}

export default Share;
