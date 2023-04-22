'use client';

import {createContext, ReactNode, useReducer} from 'react';

import {colorSchemeAndMeta, Lightness} from '@/types';
import {
  colorSchemeReducer,
  colorSchemeReducerInitialiser,
  ColorSchemeState,
  useDispatchActions,
} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

export const CurrentColorSchemeContext = createContext<
  colorSchemeAndMeta | undefined
>(undefined);
export const SetCurrentColorSchemeContext = createContext<
  ((colorSchemeName: colorSchemeAndMeta['name']) => void) | undefined
>(undefined);
export const CurrentLightnessContext = createContext<Lightness>('light');
export const SetCurrentLightnessContext = createContext<
  ((lightness: Lightness) => void) | undefined
>(undefined);
export const SetNextPrevColorSchemeContext = createContext<
  ((direction: 'next' | 'prev') => void) | undefined
>(undefined);

type ColorSchemesProviderProps = {
  children: ReactNode;
  colorSchemes: colorSchemeAndMeta[];
};

const initState: ColorSchemeState = {
  currentColorScheme: {} as colorSchemeAndMeta,
  currentLightness: 'dark',
  lightColorSchemes: [],
  darkColorSchemes: [],
  colorSchemes: [],
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
