import React, { useState } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';

export default function ImageGallery() {
  //const[display, changeDisplay] = useState([]);




  return (
    <img src={`${stylesData[0].photos[0].url}`}></img>
  );

}