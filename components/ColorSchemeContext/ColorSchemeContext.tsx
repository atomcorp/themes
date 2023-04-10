'use client';

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useReducer,
  Reducer,
  useCallback,
} from 'react';

import {colourShemeAndMeta, Lightness} from '@/types';
import {
  ColorSchemeAction,
  colorSchemeReducer,
  colorSchemeReducerInitialiser,
  ColorSchemeState,
  useDispatchActions,
} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

export const CurrentColorSchemeContext =
  createContext<colourShemeAndMeta['name']>('');
export const SetCurrentColorSchemeContext = createContext<
  (colorSchemeName: colourShemeAndMeta['name']) => void
>(() => {});
export const CurrentLightnessContext = createContext<Lightness>('light');
export const SetCurrentLightnessContext = createContext<
  (lightness: Lightness) => void
>(() => {});
export const SetNextPrevColorSchemeContext = createContext<
  (direction: 'next' | 'prev') => void
>(() => {});

type ColorSchemesProviderProps = {
  children: ReactNode;
  colorSchemes: colourShemeAndMeta[];
};

const initState: ColorSchemeState = {
  currentColorScheme: '',
  currentLightness: 'dark',
  lightColorSchemes: [],
  darkColorSchemes: [],
};

export const ColorSchemesProvider = (props: ColorSchemesProviderProps) => {
  const [state, dispatch] = useReducer(colorSchemeReducer, initState, () =>
    colorSchemeReducerInitialiser(props.colorSchemes)
  );

  const {setCurrentColorScheme, setCurrentLightness, setNextPrevColorScheme} =
    useDispatchActions(dispatch);

  return (
    <CurrentColorSchemeContext.Provider value={state.currentColorScheme}>
      <SetCurrentColorSchemeContext.Provider value={setCurrentColorScheme}>
        <CurrentLightnessContext.Provider value={state.currentLightness}>
          <SetCurrentLightnessContext.Provider value={setCurrentLightness}>
            <SetNextPrevColorSchemeContext.Provider
              value={setNextPrevColorScheme}
            >
              {props.children}
            </SetNextPrevColorSchemeContext.Provider>
          </SetCurrentLightnessContext.Provider>
        </CurrentLightnessContext.Provider>
      </SetCurrentColorSchemeContext.Provider>
    </CurrentColorSchemeContext.Provider>
  );
};
