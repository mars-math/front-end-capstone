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
import QandA from '../client/src/components/QandA/QandA.jsx';

beforeAll(() => testServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  testServer.resetHandlers();
  cleanup;
});
afterAll(() => testServer.close());
beforeEach(() => {
  act(() => {
    render(<QandA url="43230" />);
  });
});

describe('Q and A', () => {

  test('renders Q and A page', async () => {
    const qanda = await waitFor(() => screen.getByTestId('QandA'));

    expect(qanda).toBeInTheDocument();
  });

  test('renders more answers', async () => {
    const button = await waitFor(() => screen.getAllByTestId('More-Answers'));
    fireEvent.click(button[0]);
    const answerList = await waitFor(() => screen.getAllByTestId('Answers'));

    expect(answerList).toHaveLength(4);
  });

  test('renders more questions', async () => {
    const button = await waitFor(() => screen.getAllByTestId('More-Questions'));
    fireEvent.click(button[0]);
    const questionList = await waitFor(() => screen.getAllByTestId('Questions'));

    expect(questionList).toHaveLength(1);
  });

  test('adding an answer opens a new window', async () => {
    const button = await waitFor(() => screen.getAllByTestId('add-answer'));
    fireEvent.click(button[0]);
    const addPopup = await waitFor(() => screen.getAllByTestId('answer-popout'));

    expect(addPopup[0]).toBeInTheDocument();
  });

  test('adding a question opens a new window', async () => {
    const button = await waitFor(() => screen.getAllByTestId('add-question'));
    fireEvent.click(button[0]);
    const addPopup = await waitFor(() => screen.getByTestId('question-popout'));

    expect(addPopup).toBeInTheDocument();
  });

  test('Search functionality', async () => {
    const searchBar = await waitFor(() => screen.getByPlaceholderText("HAVE A QUESTION? SEARCH FOR ANSWERS..."));
    const searchButton = await waitFor(() => screen.getByTestId('search-button'));
    fireEvent.change(searchBar, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(searchBar.value).toBe('test');
  });

});
