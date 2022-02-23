import React, { useState } from 'react';
// import ImageGallery from './SM-ImageGallery.jsx'
import ProductInfo from './SM-ProductInfo.jsx';
import StyleSelector from './SM-StyleSelector.jsx';

export default function Overview() {

  return (
    <div className='overview-container'>
          <div className='right-container'>
            <ProductInfo/>
          </div>
          <div className='left-container'>
            <StyleSelector/>
          </div>
    </div>

  );

}
