import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const {
  reviews,
  meta,
  product,
} = require('./data/allData.js');

const server = setupServer(
  rest.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(reviews),
  )),
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(meta),
  )),
  rest.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews', (req, res, ctx) => res(
    ctx.status(201),
  )),
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/:id', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(product),
  )),
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions', (req, res, ctx) => res(
    ctx.
    ctx.json(sampleDAta),
  ))
  // rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/', (req, rest, ctx) => res(
  //   ctx.status(200),
  //   ctx.json(product),
  // ))
)

export default server;