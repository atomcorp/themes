import {colorSchemeAndMeta} from '@/types';
import {renderHook} from '@testing-library/react';
import {
  getNextPrevColorScheme,
  colorSchemesFilteredByLlightness,
  colorSchemeReducerInitialiser,
  useDispatchActions,
  ColorSchemeState,
  colorSchemeReducer,
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
    colorSchemesFilteredByLlightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).toEqual(darkColorSchemes);
  expect(
    colorSchemesFilteredByLlightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).not.toEqual(lightColorSchemes);
});

test('filter color schemes by lightness', () => {
  const isDark = false;
  expect(
    colorSchemesFilteredByLlightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).toEqual(lightColorSchemes);
  expect(
    colorSchemesFilteredByLlightness(
      colorSchemes as colorSchemeAndMeta[],
      isDark
    )
  ).not.toEqual(darkColorSchemes);
});

test('initialise color scheme reducer', () => {
  expect(
    colorSchemeReducerInitialiser(colorSchemes as colorSchemeAndMeta[])
  ).toEqual({
    activeColorScheme: darkColorSchemes[0],
    lightness: 'dark',
    darkColorSchemes,
    lightColorSchemes,
    colorSchemes,
  });
});

test('test dispatch actions', () => {
  const dispatch = jest.fn();
  const {result} = renderHook(() => useDispatchActions(dispatch));
  const {setActiveColorScheme} = result.current;
  setActiveColorScheme('Light A');
  expect(dispatch).toHaveBeenCalledWith({
    type: 'setColorScheme',
    payload: {
      colorSchemeName: 'Light A',
    },
  });
  const {setLightness} = result.current;
  setLightness('light');
  expect(dispatch).toHaveBeenCalledWith({
    type: 'setLightness',
    payload: {
      lightness: 'light',
    },
  });
  const {setNextPrevColorScheme} = result.current;
  setNextPrevColorScheme('next');
  expect(dispatch).toHaveBeenCalledWith({
    type: 'setNextPrevColorScheme',
    payload: {
      direction: 'next',
    },
  });
});

test('colorSchemeReducer should set new color scheme', () => {
  const state: ColorSchemeState = {
    activeColorScheme: darkColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'dark',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setColorScheme',
    payload: {
      colorSchemeName: darkColorSchemes[1].name,
    },
  });

  const nextState = {...state};
  nextState.activeColorScheme = darkColorSchemes[1] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});

test('colorSchemeReducer should throw if given an invalid color scheme', () => {
  const state: ColorSchemeState = {
    activeColorScheme: darkColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'dark',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  expect(() =>
    colorSchemeReducer(state, {
      type: 'setColorScheme',
      payload: {
        colorSchemeName: 'Invalid Color Scheme',
      },
    })
  ).toThrow();
});

test('colorSchemeReducer should set new lightness (to light)', () => {
  const state: ColorSchemeState = {
    activeColorScheme: darkColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'dark',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setLightness',
    payload: {
      lightness: 'light',
    },
  });

  const nextState = {...state};
  nextState.lightness = 'light';
  nextState.activeColorScheme = lightColorSchemes[0] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});

test('colorSchemeReducer should set new lightness (to dark)', () => {
  const state: ColorSchemeState = {
    activeColorScheme: lightColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'light',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setLightness',
    payload: {
      lightness: 'dark',
    },
  });

  const nextState = {...state};
  nextState.lightness = 'dark';
  nextState.activeColorScheme = darkColorSchemes[0] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});

test('colorSchemeReducer should set setNextPrevColorScheme', () => {
  const state: ColorSchemeState = {
    activeColorScheme: darkColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'dark',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setNextPrevColorScheme',
    payload: {
      direction: 'next',
    },
  });

  const nextState = {...state};
  nextState.activeColorScheme = darkColorSchemes[1] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});

test('colorSchemeReducer should set setNextPrevColorScheme', () => {
  const state: ColorSchemeState = {
    activeColorScheme: darkColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'dark',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setNextPrevColorScheme',
    payload: {
      direction: 'next',
    },
  });

  const nextState = {...state};
  nextState.activeColorScheme = darkColorSchemes[1] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});

test('colorSchemeReducer should set setNextPrevColorScheme when light', () => {
  const state: ColorSchemeState = {
    activeColorScheme: lightColorSchemes[0] as colorSchemeAndMeta,
    lightness: 'light',
    darkColorSchemes: darkColorSchemes as colorSchemeAndMeta[],
    lightColorSchemes: lightColorSchemes as colorSchemeAndMeta[],
    colorSchemes: colorSchemes as colorSchemeAndMeta[],
  };

  const reducer = colorSchemeReducer(state, {
    type: 'setNextPrevColorScheme',
    payload: {
      direction: 'next',
    },
  });

  const nextState = {...state};
  nextState.activeColorScheme = lightColorSchemes[1] as colorSchemeAndMeta;

  expect(reducer).toEqual(nextState);
});
