import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Category from './components/Overview/SM-Category.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

//dummy test
// it('one is one', () => {
//   expect(1).toEqual(1)
// });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('it renders given category name', () => {
  render(<Category category='Skirts'/>)
  expect(screen.getByText('Skirts')).toBeInTheDocument()
});