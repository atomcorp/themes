import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';

import Home from './Home';

const schemes = [
  {
    name: '3024 Day',
    black: '#090300',
    red: '#db2d20',
    green: '#01a252',
    yellow: '#fded02',
    blue: '#01a0e4',
    purple: '#a16a94',
    cyan: '#b5e4f4',
    white: '#a5a2a2',
    brightBlack: '#5c5855',
    brightRed: '#e8bbd0',
    brightGreen: '#3a3432',
    brightYellow: '#4a4543',
    brightBlue: '#807d7c',
    brightPurple: '#d6d5d4',
    brightCyan: '#cdab53',
    brightWhite: '#f7f7f7',
    background: '#f7f7f7',
    foreground: '#4a4543',
  },
  {
    name: 'Duotone Dark',
    black: '#1f1d27',
    red: '#d9393e',
    green: '#2dcd73',
    yellow: '#d9b76e',
    blue: '#ffc284',
    purple: '#de8d40',
    cyan: '#2488ff',
    white: '#b7a1ff',
    brightBlack: '#353147',
    brightRed: '#d9393e',
    brightGreen: '#2dcd73',
    brightYellow: '#d9b76e',
    brightBlue: '#ffc284',
    brightPurple: '#de8d40',
    brightCyan: '#2488ff',
    brightWhite: '#eae5ff',
    background: '#1f1d27',
    foreground: '#b7a1ff',
  },
  {
    name: 'Ubuntu',
    black: '#2e3436',
    red: '#cc0000',
    green: '#4e9a06',
    yellow: '#c4a000',
    blue: '#3465a4',
    purple: '#75507b',
    cyan: '#06989a',
    white: '#d3d7cf',
    brightBlack: '#555753',
    brightRed: '#ef2929',
    brightGreen: '#8ae234',
    brightYellow: '#fce94f',
    brightBlue: '#729fcf',
    brightPurple: '#ad7fa8',
    brightCyan: '#34e2e2',
    brightWhite: '#eeeeec',
    background: '#300a24',
    foreground: '#eeeeec',
  },
];

const mockClipboard = jest.fn((theme) => theme);
jest.mock('clipboard-polyfill', () => {
  return {writeText: (theme) => mockClipboard(theme)};
});

beforeEach(() => {
  fetchMock.reset();
  mockClipboard.mockClear();
});

it('Renders the App', async () => {
  fetchMock.mock(
    `${process.env.REACT_APP_PUBLIC_PATH}/colour-schemes.json`,
    JSON.stringify(schemes)
  );
  const {getByText, getByTestId, getByLabelText} = render(<Home />);
  await waitForElementToBeRemoved(() => getByText(/loading/i), 1000);
  expect(getByTestId('theme-list').childNodes.length).toBe(schemes.length);
  expect(getByTestId('selected-title').innerText).toBe(schemes[0].title);
  fireEvent.click(getByLabelText('Ubuntu'), {
    target: {value: 'Ubuntu'},
  });
  expect(getByLabelText('Ubuntu').checked).toBe(true);
  // wait for the child component to be rerendered, i think?
  wait(() => expect(getByTestId('selected-title').innerText).toBe('Ubuntu'));
  fireEvent.click(getByText(/copy theme/i));
  wait(() => expect(mockClipboard).toBeCalled());
  expect(JSON.parse(mockClipboard.mock.calls[0][0]).name).toBe('Ubuntu');
  expect(JSON.parse(mockClipboard.mock.calls[0][0])).toMatchObject(schemes[2]);
});

// TODO: small screen
