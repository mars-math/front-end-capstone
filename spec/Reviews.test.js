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

  test('Write Review Form testing', async () => {
    const button = await waitFor(() => screen.getByText('Write New Review'));
    fireEvent.click(button);
    const summary = await waitFor(() => screen.getByPlaceholderText('Best purchase ever!'));
    const button2 = await waitFor(() => screen.getByTestId('write-review-submit'));
    const chars = await waitFor(() => screen.getAllByTestId('chars'));
    fireEvent.change(summary, { target: { value: 'test' } });
    fireEvent.click(button2);
    expect(summary.value).toBe('test');
    expect(chars).toHaveLength(4);
  });

  test('Write Review image rendering', async () => {
    const button = await waitFor(() => screen.getByText('Write New Review'));
    fireEvent.click(button);
    const button2 = await waitFor(() => screen.getByText('Upload'));
    const imageField = await waitFor(() => screen.getByTestId('image-input'));
    fireEvent.change(imageField, { target: {value: 'https://i.kym-cdn.com/entries/icons/facebook/000/017/618/pepefroggie.jpg'} });
    fireEvent.click(button2);

    expect(imageField.value).toBe('https://i.kym-cdn.com/entries/icons/facebook/000/017/618/pepefroggie.jpg');
  })

  test('image opens new window', async () => {
    const button = await waitFor(() => screen.getAllByTestId('image-button'));
    fireEvent.click(button[0]);
    const imagePopup = await waitFor(() => screen.getByTestId('image-popup'));

    expect(imagePopup).toBeInTheDocument();
  });

  test('Progress bar testing', async () => {
    const button = await waitFor(() => screen.getAllByTestId('progress-bar'));
    fireEvent.click(button[0]);
    const count = await waitFor(() => screen.getAllByTestId('progress-count'));
    expect(button[0]).toHaveStyle(`color: blue`);
    fireEvent.click(button[0]);
    expect(button[0]).toHaveStyle(`color: ButtonText`);
    expect(Number(count[0].innerHTML)).toBeGreaterThanOrEqual(0);
  })

  test('base sorting testing', async() => {
    const option = await waitFor(() => screen.getByTestId('base-sort'));
    fireEvent.change(option, { target: { value: 'most helpful ▼' } });

    expect(option.value).toBe('most helpful ▼');
  })




});