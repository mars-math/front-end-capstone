import React from 'react';
import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';
import {
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import testServer from './testServer.js';
import ProductInfo from '../components/Overview/SM-ProductInfo.jsx';

const data = [
  {
  "id": 42366,
  "campus": "hr-lax",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2021-08-13T14:39:39.968Z",
  "updated_at": "2021-08-13T14:39:39.968Z"
}];

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());
beforeAll(() => {
  act(() => {
    render(<ProductInfo data={data} />);
  });
});

describe('ProdInfo', () => {
  test('renders to the DOM', async () => {
    const prodComponent = await waitFor(() => screen.getByTestId('prodInfo'));
    expect(prodComponent).toBeInTheDocument();
  });
});





// const axios = require('./axiosConfig.js');
//const getData = require('../components/Overview.jsx');
// const axios = require('axios');

// jest.mock('axios');

// axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/42366/`)

// axios.get.mockResolvedValue({
//   data: [
//     {
//       "id": 42366,
//       "campus": "hr-lax",
//       "name": "Camo Onesie",
//       "slogan": "Blend in to your crowd",
//       "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//       "category": "Jackets",
//       "default_price": "140.00",
//       "created_at": "2021-08-13T14:39:39.968Z",
//       "updated_at": "2021-08-13T14:39:39.968Z"
//     }
//   ]
// });



// jest.mock('./axiosConfig', () => {
//   return {
//     baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
//     request: jest.fn().mockResolvedValue({
      // data: [
      //   {
      //     "id": 42366,
      //     "campus": "hr-lax",
      //     "name": "Camo Onesie",
      //     "slogan": "Blend in to your crowd",
      //     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      //     "category": "Jackets",
      //     "default_price": "140.00",
      //     "created_at": "2021-08-13T14:39:39.968Z",
      //     "updated_at": "2021-08-13T14:39:39.968Z"
      //   }
      // ]
//     }),
//   }
// });


// describe('testMock', () => {
//   afterEach(() => jest.resetAllMocks());

//   it('test test test', async () => {
//     const dummyData = await getData(42366);
//     expect(axios.request).toHaveBeenCalled();
//     expect(axios.request).toHaveBeenCalledWith({ method: 'get', url: '/42366' });
//     expect(data.length).toEqual(1);
//     expect(photos[0].albumId).toEqual(42366);
//   });

//   test('should fetch product data', () => {
//     const product =  [
      // {
      //   "id": 42366,
      //   "campus": "hr-lax",
      //   "name": "Camo Onesie",
      //   "slogan": "Blend in to your crowd",
      //   "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      //   "category": "Jackets",
      //   "default_price": "140.00",
      //   "created_at": "2021-08-13T14:39:39.968Z",
      //   "updated_at": "2021-08-13T14:39:39.968Z"
      // }
//     ];
//     axios.get.mockResolvedValue(product);
//     return
//   });