import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import renderer from 'react-test-renderer';
import AllReviews from '../AllReviews.jsx';
import RatingBreakdown from '../RatingBreakdown.jsx';
import IndividualReview from '../IndividualReview.jsx';
import IndividualExample from '../ratingexampledata/individualExample.js'

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
  render(<AllReviews />)

  const reviews = screen.getAllByTestId('tile');

  expect(reviews).toHaveLength(2);

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
    .create(<IndividualReview render={IndividualExample} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
