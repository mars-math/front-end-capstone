import React, { useState } from 'react';
import axios from 'axios';
import API_KEY from '../../config/config.js';
//import StarRating from './SM-StarRating.jsx';
import Category from './SM-Category.jsx';
import Title from './SM-Title.jsx';
import Price from './SM-Price.jsx';


// function ProductInfo() {
//   //const []

//   return (
//     <>
//       <div>Stars</div>
//       <Category />
//       <div>Product Title</div>
//     </>
//   );

// }

// export default ProductInfo;

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
        console.log('hiii', this.state.data)
      )

    //need to get review information
    // axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews', {params: {product_id: this.state.data.id}})
    //   .then(res => {
    //     console.log('biya', res.data);
    //     this.setState({
    //       review: res.data
    //     });
    //   })

  }

  render() {
    return (
      <>
        {/* <StarRating /> */}
        <Category category={this.state.data.category} />
        <Title title={this.state.data.name}/>
        <Price price={this.state.data.default_price}/>
      </>
    );
  }
}

export default ProductInfo;