const axios = require('./axiosConfig.js');
const getData = require('./index.js');

jest.mock('./axiosConfig', () => {
  return {
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
    request: jest.fn().mockResolvedValue({
      data: [
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
        }
      ]
    }),
  }
});


