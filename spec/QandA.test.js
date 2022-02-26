import React from 'react';
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import {
  test,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  cleanup,
} from '@jest/globals';
import '@testing-library/jest-dom'
import testServer from './testServer.js';
import QandA from '../client/src/components/QandA/QandA.jsx';

beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  testServer.resetHandlers();
  cleanup;
});
afterAll(() => testServer.close());
beforeEach(() => {
  act(() => {
    render(<QandA url="43230" />);
  });
});

