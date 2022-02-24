import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Price from './components/Overview/SM-Price.jsx';
import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders correctly', () => {
  const tree = renderer
  .create(<App url='43230'/>)
  .toJSON();
  console.log(tree)
  expect(tree).toMatchSnapshot();
});

test('it renders given category name', () => {
  render(<Price price='3'/>)
  expect(screen.getByText('$3')).toBeInTheDocument()
});

