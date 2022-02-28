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
  // get question list
  rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions', (req, res, ctx) => res(
    ctx.
    ctx.json(sampleData),
  )),
  // add quesiton
  rest.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions', (req, res, ctx) => res(
    ctx.status(201),
  )),
  // add answer
  rest.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/:question_id/answers', (req, res, ctx) => res(
    ctx.status(201),
  )),
  // mark question helpful
  rest.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/:question_id/helpful', (req, res, ctx) => res(
    ctx.status(201),
  )),
  // mark answer helpful
  rest.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/:answer_id/helpful', (req, res, ctx) => res(
    ctx.status(201),
  )),
  // report answer
  rest.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/:answer_id/report', (req, res, ctx) => res(
    ctx.status(201),
  ))
)

export default server;