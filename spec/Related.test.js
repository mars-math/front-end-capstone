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
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom'
import testServer from './testServer.js';
import RelatedItems from '../client/src/components/RelatedItemsAndOutfit/RelatedItems.jsx';
import OutfitList from '../client/src/components/RelatedItemsAndOutfit/OutfitList.jsx';
import ProductCard from '../client/src/components/RelatedItemsAndOutfit/ProductCard.jsx';
import Carousel from 'react-multi-carousel';

beforeAll(() => {
  testServer.listen({ onUnhandledRequest: "bypass" })
});
afterEach(() => {
  testServer.resetHandlers();
  window.localStorage.clear();
  cleanup;
});
afterAll(() => testServer.close());
beforeEach(() => {
  act(() => {
    render(
      <>
        <RelatedItems url="43230" />
        <OutfitList url="43230" />
        <ProductCard
          prodId="43230"
          key="43230"
          isOutfitList={false}
        />
      </>
    );
  });
});

describe('Related Items & Outfits', () => {
  test('renders Related Items page', async () => {
    const allRelated = await waitFor(() => screen.getByTestId('allRelated'));

    expect(allRelated).toBeInTheDocument();
  });

  test('renders Outfit Items page', async () => {
    const allOutfit = await waitFor(() => screen.getByTestId('allOutfit'));

    expect(allOutfit).toBeInTheDocument();
  });

  test('renders ProductCard', async () => {
    const allOutfit = await waitFor(() => screen.getByTestId('prodCard'));

    expect(allOutfit).toBeInTheDocument();
  });

  // test('adds outfit to LocalStorage', async () => {

  //   const button = await waitFor(() => screen.getByRole('button', { name: /add to outfit/i }));

  //   fireEvent.click(button);

  //   const list = await waitFor(() => screen.getByTestId('allOutfit').getByRole('list'));

  //   // const card = await waitFor(() => screen.getByTestId('allOutfit'),within(document).getByRole('listitem'));

  //   expect(list).toHaveLength(1)


  //   // fireEvent.click(screen.getByText('Load'))

  //   // // Wait for page to update with query text
  //   // const items = await screen.findAllByText(/Item #[0-9]: /)
  //   // expect(items).toHaveLength(10)

  //   // expect(window.localStorage.getItem('43230')).toEqual('43230')
  //   // // expect(card.toBeInTheDocument())


  // });


  // test('renders related items', async () => {
  //   // const items = await waitFor(() => screen.getByTestId('allOutfit'));
  //   // const items = screen.getByTestId('allRelated');within(document).getAllByRole('list');

  //   // const card = await waitFor(() => screen.getByText(/jena heels/i));

  //   const card = await waitFor(() => document.querySelector('#app > div > div:nth-child(3) > div:nth-child(2) > ul > li:nth-child(4) > div'))

  //   // const items = document.querySelector('#app > div > div:nth-child(3) > div:nth-child(2) > ul > li:nth-child(4) > div > p');

  //   expect(card).toBeInTheDocument();
  // });

  // test('renders Comparison Modal', async () => {

  //   const button = await waitFor(() => document.querySelector('#app > div > div:nth-child(3) > div:nth-child(2) > ul > li:nth-child(1) > div > button > svg'));

  //   fireEvent.click(button);

  //   const comparison = await waitFor(() => screen.getByTestId('comparison'));

  //   expect(comparison).toBeVisible();
  // });
  // test('renders Card Carousel', async () => {
  //   const button = await waitFor(() => screen.getByText('Add to Outfit'));

  //   fireEvent.click(button);

  //   const card = await waitFor(() => screen.getByText('Dan Tank Top'));

  //   expect(card).toBeVisible();
  // });

  // test('renders 2 reviews', async () => {
  //   const indivElement = await waitFor(() => screen.getAllByTestId('tiles'));

  //   expect(indivElement).toHaveLength(2);
  // });

  // test('renders 4 reviews on click', async () => {
  //   const button = await waitFor(() => screen.getByText('More Reviews'));

  //   fireEvent.click(button);

  //   const indiv = await waitFor(() => screen.getAllByTestId('tiles'));

  //   expect(indiv).toHaveLength(4);
  // })

  // test('Write Review button pops out a form', async () => {
  //   const button = await waitFor(() => screen.getByText('Write New Review'));
  //   fireEvent.click(button);
  //   const popup = await waitFor(() => screen.getByText('Write Your Review'));
  //   const popup2 = await waitFor(() => screen.getByTestId('popup'));
  //   const popup3 = await waitFor(() => screen.getAllByTestId('labels'));

  //   expect(popup).toBeVisible();
  //   expect(popup2).toBeInTheDocument();
  //   expect(popup3).toHaveLength(3);
  // })

  // test('Write Review Form testing', async () => {
  //   const button = await waitFor(() => screen.getByText('Write New Review'));
  //   fireEvent.click(button);
  //   const summary = await waitFor(() => screen.getByPlaceholderText('Best purchase ever!'));
  //   const button2 = await waitFor(() => screen.getByTestId('write-review-submit'));
  //   const chars = await waitFor(() => screen.getAllByTestId('chars'));
  //   fireEvent.change(summary, { target: { value: 'test' } });
  //   fireEvent.click(button2);
  //   expect(summary.value).toBe('test');
  //   expect(chars).toHaveLength(4);
  // });

  // test('Write Review image rendering', async () => {
  //   const button = await waitFor(() => screen.getByText('Write New Review'));
  //   fireEvent.click(button);
  //   const button2 = await waitFor(() => screen.getByText('Upload'));
  //   const imageField = await waitFor(() => screen.getByTestId('image-input'));
  //   fireEvent.change(imageField, { target: {value: 'https://i.kym-cdn.com/entries/icons/facebook/000/017/618/pepefroggie.jpg'} });
  //   fireEvent.click(button2);

  //   expect(imageField.value).toBe('https://i.kym-cdn.com/entries/icons/facebook/000/017/618/pepefroggie.jpg');
  // })

  // test('image opens new window', async () => {
  //   const button = await waitFor(() => screen.getAllByTestId('image-button'));
  //   fireEvent.click(button[0]);
  //   const imagePopup = await waitFor(() => screen.getByTestId('image-popup'));

  //   expect(imagePopup).toBeInTheDocument();
  // });

  // test('Progress bar testing', async () => {
  //   const button = await waitFor(() => screen.getAllByTestId('progress-bar'));
  //   fireEvent.click(button[0]);
  //   const count = await waitFor(() => screen.getAllByTestId('progress-count'));
  //   expect(button[0]).toHaveStyle(`color: blue`);
  //   fireEvent.click(button[0]);
  //   expect(button[0]).toHaveStyle(`color: ButtonText`);
  //   expect(Number(count[0].innerHTML)).toBeGreaterThanOrEqual(0);
  // })

  // test('base sorting testing', async() => {
  //   const option = await waitFor(() => screen.getByTestId('base-sort'));
  //   fireEvent.change(option, { target: { value: 'most helpful ▼' } });

  //   expect(option.value).toBe('most helpful ▼');
  // })
})