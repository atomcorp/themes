import {colorSchemeAndMeta} from '@/types';
import {
  getNextPrevColorScheme,
  colorSchemesFilteredByCurrentLightness,
  colorSchemeReducerInitialiser,
} from './colorSchemeContextReducer';

const lightColorSchemes = [
  {
    name: 'Light A',
    meta: {
      isDark: false,
    },
  },
  {
    name: 'Light B',
    meta: {
      isDark: false,
    },
  },
  {
    name: 'Light C',
    meta: {
      isDark: false,
    },
  },
];

const darkColorSchemes = [
  {
    name: 'Dark A',
    meta: {
      isDark: true,
    },
  },
  {
    name: 'Dark B',
    meta: {
      isDark: true,
    },
  },
];

const colorSchemes = [...lightColorSchemes, ...darkColorSchemes];

test('get next color scheme', () => {
  expect(
    getNextPrevColorScheme(
      lightColorSchemes as colorSchemeAndMeta[],
      'Light A',
      'next'
    ).name
  ).toBe('Light B');
});

test('get previous color scheme', () => {
  expect(
    getNextPrevColorScheme(
      lightColorSchemes as colorSchemeAndMeta[],
      'Light B',
      'prev'
    ).name
  ).toBe('Light A');
});

test('get next color scheme when at end of list', () => {
  expect(
    getNextPrevColorScheme(
      lightColorSchemes as colorSchemeAndMeta[],
      'Light C',
      'next'
    ).name
  ).toBe('Light A');
});

test('get previous color scheme when at start of list', () => {
  expect(
    getNextPrevColorScheme(
      lightColorSchemes as colorSchemeAndMeta[],
      'Light A',
      'prev'
    ).name
  ).toBe('Light C');
});

test('throw error is color scheme not found', () => {
  expect(() =>
    getNextPrevColorScheme(
      lightColorSchemes as colorSchemeAndMeta[],
      'Light D',
      'next'
    )
  ).toThrow();
});

test('filter color schemes by darkness', () => {
  const isDark = true;
  expect(
    colorSchemesFilteredByCurrentLightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).toEqual(darkColorSchemes);
  expect(
    colorSchemesFilteredByCurrentLightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).not.toEqual(lightColorSchemes);
});

test('filter color schemes by lightness', () => {
  const isDark = false;
  expect(
    colorSchemesFilteredByCurrentLightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).toEqual(lightColorSchemes);
  expect(
    colorSchemesFilteredByCurrentLightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).not.toEqual(darkColorSchemes);
});

test('initialise color scheme reducer', () => {
  expect(
    colorSchemeReducerInitialiser(colorSchemes as colorSchemeAndMeta[])
  ).toEqual({
    currentColorScheme: darkColorSchemes[0],
    currentLightness: 'dark',
    darkColorSchemes,
    lightColorSchemes,
    colorSchemes,
  });
});
