import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Price from './components/Overview/SM-Price.jsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

//dummy test
// it('one is one', () => {
//   expect(1).toEqual(1)
// });


xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

xtest('it renders given category name', () => {
  render(<Price price='3'/>)
  expect(screen.getByText('$3')).toBeInTheDocument()
});
