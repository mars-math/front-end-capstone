import React, { useState } from 'react';
import ImageGallery from './SM-ImageGallery.jsx'
import ProductInfo from './SM-ProductInfo.jsx';
import StyleSelector from './SM-StyleSelector.jsx';

export default function Overview() {

  return (
    <div className='overview-container'>
      <div className='left-container'>
        <ImageGallery/>
      </div>
        <div className='right-container'>
          <div className='productinfo-container'>
            <ProductInfo/>
          </div>
          <div className='styleselector-container'>
            <StyleSelector/>
          </div>
        </div>
    </div>

  );

}
