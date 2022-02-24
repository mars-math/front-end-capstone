import React, { useState } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config/config.js';
import StarRating from './SM-StarRating.jsx';
import Price from './SM-Price.jsx';
import Share from './SM-Share.jsx';
//import '../../../dist/SM-styles.css'
import Stars from '../RatingsReview/ratingexampledata/stars.js';


const categoryStyle = {
  fontSize: '15px',
  color: 'grey',
  fontFamily: 'Amatic SC'
}

const titleStyle = {
  fontSize: '20px',
  color: 'black'
}

export default function ProductInfo(props) {

    return (
      <>
        <StarRating ratings={props.reviewsData} stars=      {Stars}/>
        <div style={categoryStyle}>
          {props.productData.category}</div>
        <div style={titleStyle}>
          {props.productData.name}</div>
        <Price price={props.productData.default_price}/>
        <Share />
      </>
    );

}
