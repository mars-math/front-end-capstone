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
import Comparison from '../client/src/components/RelatedItemsAndOutfit/Comparison.jsx';
import Carousel from 'react-multi-carousel';

const overviewProductData = {
  "prodInfo": {
    "id": 43230,
    "name": "Dan Tank Top",
    "category": "Tank Top",
    "default_price": "524.00",
    "features": [
      {
        "feature": "Satisfaction Guaranteed",
        "value": null
      },
      {
        "feature": "Cut",
        "value": "\"Striaght\""
      },
      {
        "feature": "Lifetime Guarantee",
        "value": null
      }
    ]
  },
  "salePrice": "170.00",
  "prodRating": 3.6,
  "imageUrl": "https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
};

const productCardData = {
  "prodInfo": {
    "id": 42594,
    "name": "Lavonne Hat",
    "category": "Hat",
    "default_price": "441.00",
    "features": [
      {
        "feature": "Green Leaf Certified",
        "value": null
      },
      {
        "feature": "Material",
        "value": "\"Control Support Bridge\""
      }
    ]
  },
  "salePrice": null,
  "prodRating": 2.8,
  "imageUrl": "https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
}

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
        <Comparison
          overviewProductData={overviewProductData}
          productCardData={productCardData}
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

  test('renders Comparison Modal', async () => {
    const compModal = await waitFor(() => screen.getByTestId('compModal'));

    expect(compModal).toBeInTheDocument();
  });

})