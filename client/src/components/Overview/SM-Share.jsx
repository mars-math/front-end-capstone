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
        <img style={buttonStyle} src={fb}/>
      </a>
      <a href="https://www.facebook.com/share">
        <img style={buttonStyle} src={twitter}/>
      </a>
      <a href="https://www.facebook.com/share">
        <img style={buttonStyle} src={pinterest}/>
      </a>

    </div>
  );
}

export default Share;
