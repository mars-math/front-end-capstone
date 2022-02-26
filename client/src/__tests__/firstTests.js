// import React from 'react';
// import ReactDOM from 'react-dom';
// import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
// import App from './components/App.jsx';
// import Price from './components/Overview/SM-Price.jsx';
// import '@testing-library/jest-dom';



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// it('renders correctly', () => {
//   const tree = renderer
//   .create(<App url='43230'/>)
//   .toJSON();
//   console.log(tree)
//   expect(tree).toMatchSnapshot();
// });

// test('it renders given category name', () => {
//   render(<Price price="3" />);
//   expect(screen.getByText('$3')).toBeInTheDocument();
// });

// it('renders correctly', () => {
//   const tree = renderer
//     .create(<App url="43230" />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('testMock', () => {
  afterEatch(() => jest.resetAllMocks());

  it('test test test', async () => {
    const dummyData = await getData(42366);
    expect(axios.request).toHaveBeenCalled();
    expect(axios.request).toHaveBeenCalledWith({ method: 'get', url: '/42366' });
    expect(photos.length).toEqual(1);
    expect(photos[0].albumId).toEqual(42366);
  })
})