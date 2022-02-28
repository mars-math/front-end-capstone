import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const {
  productData,
  meta,
  styles,
} = require('./data/allData.js');

const server = setupServer(
  rest.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/:id`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(productData),
  )),
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(meta),
  )),
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/:product_id/styles', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(styles),
  )),
)

export default server;