import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {getRandomColour, returnInitialTheme} from './homeMethods';
import Home from './Home';
import customColourSchemes from '../../custom-colour-schemes.json';

// theres 3 darks themes and 2 light themes
const schemes = [
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
    isDark: true,
  },
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
    isDark: false,
  },
  {
    name: 'Galaxy',
    black: '#000000',
    red: '#f9555f',
    green: '#21b089',
    yellow: '#fef02a',
    blue: '#589df6',
    purple: '#944d95',
    cyan: '#1f9ee7',
    white: '#bbbbbb',
    brightBlack: '#555555',
    brightRed: '#fa8c8f',
    brightGreen: '#35bb9a',
    brightYellow: '#ffff55',
    brightBlue: '#589df6',
    brightPurple: '#e75699',
    brightCyan: '#3979bc',
    brightWhite: '#ffffff',
    background: '#1d2837',
    foreground: '#ffffff',
    isDark: true,
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
    isDark: true,
  },
  {
    name: 'Man Page',
    black: '#000000',
    red: '#cc0000',
    green: '#00a600',
    yellow: '#999900',
    blue: '#0000b2',
    purple: '#b200b2',
    cyan: '#00a6b2',
    white: '#cccccc',
    brightBlack: '#666666',
    brightRed: '#e50000',
    brightGreen: '#00d900',
    brightYellow: '#e5e500',
    brightBlue: '#0000ff',
    brightPurple: '#e500e5',
    brightCyan: '#00e5e5',
    brightWhite: '#e5e5e5',
    background: '#fef49c',
    foreground: '#000000',
    isDark: false,
  },
];

const mockClipboard = jest.fn((theme) => theme);
jest.mock('clipboard-polyfill', () => {
  return {writeText: (theme) => mockClipboard(theme)};
});

beforeEach(() => {
  mockClipboard.mockClear();
});

xit('Renders the desktop App', async () => {
  const {getByText, getByTestId, getByLabelText} = render(<Home />);
  // await waitForElementToBeRemoved(() => getByText(/loading/i), 1000);
  expect(getByTestId('theme-list').childNodes.length).toBe(3);
  expect(getByTestId('selected-title').textContent).toBe('Duotone Dark');
  fireEvent.click(getByLabelText('Ubuntu'), {
    target: {value: 'Ubuntu'},
  });
  expect(getByLabelText('Ubuntu').checked).toBe(true);
  // // wait for the child component to be rerendered, i think?
  expect(getByTestId('selected-title').textContent).toBe('Ubuntu');
  fireEvent.click(getByText(/copy theme/i));
  waitFor(() => expect(mockClipboard).toBeCalled());
  expect(JSON.parse(mockClipboard.mock.calls[0][0]).name).toBe('Ubuntu');
  expect(JSON.parse(mockClipboard.mock.calls[0][0])).toMatchObject(
    schemes.find((scheme) => scheme.name === 'Ubuntu')
  );
  expect(getByText(/copied/i)).toBeTruthy;
  setTimeout(() => {
    expect(getByText(/copy theme/i)).toBeTruthy;
  }, 500);
});

xit('Renders the mobile App', async () => {
  window.resizeTo(375, 667);
  const {getByTestId, getByLabelText} = render(<Home />);
  const selectEl = getByLabelText(/change theme/i);
  expect(selectEl.value).toBe('Duotone Dark');
  expect(getByTestId('selected-title').textContent).toBe('Duotone Dark');
  // change the theme
  fireEvent.change(getByLabelText(/change theme/i), {
    target: {value: 'Galaxy'},
  });
  expect(getByLabelText(/change theme/i).value).toBe('Galaxy');
  // // wait for the child component to be rerendered, i think?
  expect(getByTestId('selected-title').textContent).toBe('Galaxy');
});

xit('Swaps between light and dark themes', async () => {
  const {getByTestId, getByLabelText} = render(<Home />);
  // await waitForElementToBeRemoved(() => getByText(/loading/i), 1000);
  expect(getByTestId('theme-list').childNodes.length).toBe(3);
  expect(getByTestId('selected-title').textContent).toBe('Duotone Dark');
  fireEvent.click(getByLabelText(/Light/i), {
    target: {value: 'LIGHT'},
  });
  expect(getByTestId('theme-list').childNodes.length).toBe(2);
  // when switching, app just gets first light theme
  expect(getByTestId('selected-title').textContent).toBe('3024 Day');
  fireEvent.click(getByLabelText(/Dark/i), {
    target: {value: 'DARK'},
  });
  expect(getByTestId('theme-list').childNodes.length).toBe(3);
  expect(getByTestId('selected-title').textContent).toBe('Duotone Dark');
});

// examples test the colours against the background
const goodContrast = {
  black: '#FFFFFF',
  red: '#FFFFFF',
  green: '#FFFFFF',
  yellow: '#FFFFFF',
  blue: '#2D818F',
  purple: '#FFFFFF',
  cyan: '#FFFFFF',
  white: '#FFFFFF',
  background: '#FFFFFF',
};

const badContrast = {
  black: '#58B9CA',
  red: '#58B9CA',
  green: '#58B9CA',
  yellow: '#58B9CA',
  blue: '#58B9CA',
  purple: '#58B9CA',
  cyan: '#58B9CA',
  white: '#58B9CA',
  background: '#FFFFFF',
};

it('should produce random colours', () => {
  expect(getRandomColour()).toBe('');
  // should be roughly 4.5 accessible
  expect(getRandomColour(goodContrast)).toBe('#2D818F');
  expect(getRandomColour(badContrast)).toBe('#58B9CA');
});

it('should return theme name from search params', () => {
  expect(returnInitialTheme('?theme=synthwave-everything')).toBe(
    'synthwave-everything'
  );
  expect(returnInitialTheme('?wrong=synthwave-everything')).toBe(null);
  expect(returnInitialTheme('')).toBe(null);
});

xit('should tab use keyboard to navigate', () => {
  // const {getByTestId, getByLabelText} = render(<Home themes={schemes} />);
});

it('should ensure custom-colour-schemes.json has correct keys', () => {
  const validkeys = {
    name: '',
    black: '',
    red: '',
    green: '',
    yellow: '',
    blue: '',
    purple: '',
    cyan: '',
    white: '',
    brightBlack: '',
    brightRed: '',
    brightGreen: '',
    brightYellow: '',
    brightBlue: '',
    brightPurple: '',
    brightCyan: '',
    brightWhite: '',
    background: '',
    foreground: '',
  };
  customColourSchemes.map((customColourScheme) => {
    Object.keys(customColourScheme).forEach((key) => {
      expect(validkeys).toHaveProperty(key);
    });
    Object.keys(validkeys).forEach((key) => {
      expect(customColourScheme).toHaveProperty(key);
    });
  });
});
