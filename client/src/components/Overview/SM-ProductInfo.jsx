import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import API_KEY from '../../../../config/config.js';
=======
>>>>>>> 926b198a3801dfece0632986a4618cfc00d6085f
import StarRating from './SM-StarRating.jsx';
import Price from './SM-Price.jsx';
import Share from './SM-Share.jsx';
import API_KEY from '../../../../config/config.js';
//import '../../../dist/SM-styles.css'


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
        console.log('hiya', res.data);
        this.setState({
          data: res.data[0]  //testing with first data entry (how to pick data based on id?)
        });
      })
      .then(() =>
        console.log('hiii', `'${this.state.data.id}'`)
      )
      .catch((err) =>
        console.log('error', err)
      )

    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews', {params: {product_id: '42366'}}) //why isn't the template literal working??
      .then(res => {
        console.log('biya', res.data);
        this.setState({
          review: res.data.results[0].rating //hardcoded to first rating
        });
      })

  }

  render() {
    return (
      <>
        <StarRating rating={this.state.review}/>
        <div style={categoryStyle}>{this.state.data.category}</div>
        <div style={titleStyle}>{this.state.data.name}</div>
        <Price price={this.state.data.default_price}/>
        <Share />
      </>
    );
  }
}

export default ProductInfo;