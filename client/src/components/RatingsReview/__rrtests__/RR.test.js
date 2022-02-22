import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import AllReviews from '../AllReviews.jsx';
import CharBreakdown from '../CharBreakdown.jsx';

afterEach(() => {
  cleanup();
});

test('should render AllReviews component', () => {
  render(<AllReviews />);
  const allReviewsElement = screen.getByTestId('allRev-1');
  expect(allReviewsElement).toBeInTheDocument();
  expect(allReviewsElement).toHaveTextContent('reviews');
});

test('matches snapshot', () => {
  const tree = renderer.create(<AllReviews />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('test CharBreakdown', () => {
//   render(<CharBreakdown />);
// });
