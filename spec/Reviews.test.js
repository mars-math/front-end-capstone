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
import AllReviews from '../client/src/components/RatingsReview/AllReviews.jsx';

beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  testServer.resetHandlers();
  cleanup;
});
afterAll(() => testServer.close());
beforeEach(() => {
  act(() => {
    render(<AllReviews url="43230" />);
  });
});

describe('Ratings and Reviews', () => {
  test('renders AllReviews page', async () => {
    const allRev = await waitFor(() => screen.getByTestId('allRev'));

    expect(allRev).toBeInTheDocument();
  });

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

  test('Write Review button pops out a form', async () => {
    const button = await waitFor(() => screen.getByText('Write New Review'));

    fireEvent.click(button);


    const popup = await waitFor(() => screen.getByText('Write Your Review'));
    const popup2 = await waitFor(() => screen.getByTestId('popup'));
    const popup3 = await waitFor(() => screen.getAllByTestId('labels'));

    expect(popup).toBeVisible();
    expect(popup2).toBeInTheDocument();
    expect(popup3).toHaveLength(3);
  })

  test('form changes when filled out', async () => {
    const button = await waitFor(() => screen.getByText('Write New Review'));
    fireEvent.click(button);
    const summary = await waitFor(() => screen.getByPlaceholderText('Best purchase ever!'));
    fireEvent.change(summary, { target: { value: 'test' } });
    expect(summary.value).toBe('test');
  });

  test('image opens new window', async () => {
    const button = await waitFor(() => screen.getAllByTestId('image-button'));
    fireEvent.click(button[0]);
    const imagePopup = await waitFor(() => screen.getByTestId('image-popup'));

    expect(imagePopup).toBeInTheDocument();

  })


});