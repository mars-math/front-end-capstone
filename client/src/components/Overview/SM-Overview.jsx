import React, { useState } from 'react';
import ImageGallery from './SM-ImageGallery.jsx'
import ProductInfo from './SM-ProductInfo.jsx';
import StyleSelector from './SM-StyleSelector.jsx';

export default function Overview() {

  return (
    <div class='overview-container'>
      <ImageGallery/>
      <div class='right-container'>
        <div class ='productinfo-container'>
          <ProductInfo/>
        </div>
        <div class='styleselector-container'>
          <StyleSelector/>
        </div>
      </div>
    </div>
  );

}
