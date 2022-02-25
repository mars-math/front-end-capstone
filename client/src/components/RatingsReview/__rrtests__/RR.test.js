import {
  render, screen, cleanup, act, waitFor,
} from '@testing-library/react';
import React from 'react';
// import axiosMock from 'axios';
import renderer from 'react-test-renderer';

import AllReviews from '../AllReviews.jsx';
import RatingBreakdown from '../RatingBreakdown.jsx';
import IndividualReview from '../IndividualReview.jsx';
import IndividualExample from '../ratingexampledata/individualExample.js';
import WriteReview from '../WriteReview.jsx';

afterEach(() => {
  cleanup();
});

test('should render AllReviews component', () => {
  render(<AllReviews />);
  const allReviewsElement = screen.getByTestId('allRev-1');
  expect(allReviewsElement).toBeInTheDocument();
  expect(allReviewsElement).toHaveTextContent('reviews');
});

xtest('shows 2 reviews initially', async () => {
  // axiosMock.get.mockResolvedValue(IndividualExample.All);

  // render(<AllReviews url="43230" />);
  // await waitFor(() => {
  //   expect(screen.getAllByTestId('tile')).toHaveLength(2);
  // });

  // const reviews = await waitFor(() => screen.getAllByTestId('tile'));

  // const res = await axiosMock.get('/products');

  // expect(reviews).toHaveLength(2);
  expect(res).toEqual(IndividualExample.All);
  // expect(screen.getByRole('button', { hidden: true })).not.toBeDisabled();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<AllReviews url="43230" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<RatingBreakdown url="43230" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<IndividualReview render={IndividualExample.justOne} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer
    .create(<WriteReview />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
