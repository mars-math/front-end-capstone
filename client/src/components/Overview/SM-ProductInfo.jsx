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

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      review: []
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = API_KEY;
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products')
      .then(res => {
        this.setState({
          data: res.data[0]  //testing with first data entry (how to pick data based on id?)
        });
      })
      .catch((err) =>
        console.log('error', err),
      );

    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews', {params: {product_id: '42366'}}) //why isn't the template literal working??
      .then(res => {
        this.setState({
          review: res.data.results[0].rating //hardcoded to first rating
        });
      })

  }

  render() {
    return (
      <>
        <StarRating rating={this.state.review} stars={Stars}/>
        <div style={categoryStyle}>{this.state.data.category}</div>
        <div style={titleStyle}>{this.state.data.name}</div>
        <Price price={this.state.data.default_price}/>
        <Share />
      </>
    );
  }
}

export default ProductInfo;