import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

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

const server = setupServer(
  // getItemDetails
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/42366/', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(data),
  )),
);

export default server;