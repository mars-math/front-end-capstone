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
} from '@jest/globals';
import '@testing-library/jest-dom'
import testServer from './testServer.js';
import AllReviews from '../client/src/components/RatingsReview/AllReviews.jsx';

beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());
beforeEach(() => {
  act(() => {
    render(<AllReviews url="43230" />);
  });
});

describe('Ratings and Reviews', () => {
  test('renders 2 reviews', async () => {
    const indivElement = await waitFor(() => screen.getAllByTestId('tiles'));

    expect(indivElement).toHaveLength(2);
  });

  test('renders 4 reviews on click', async () => {
    const button = await waitFor(() => screen.getByText('More Reviews'));

    fireEvent.click(button);

    const indiv = await waitFor(() => screen.getAllByTestId('tiles'));

    expect(indiv).toHaveLength(4);
  })
});