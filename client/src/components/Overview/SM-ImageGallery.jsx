import React, { useState } from 'react';
import Row from './SM-StyleRow.jsx';
import stylesData from './SM-dummystylesdata.js';
import productData from './SM-dummyproductdata.js';

export default function ImageGallery() {
  //const[display, changeDisplay] = useState([]);




  return (
    <>
      <img style={{height: '600px', width: '450px'}} src={`${stylesData[0].photos[0].url}`}></img>
      <p className='product-description'>{productData[0].description}</p>
    </>
  );

}