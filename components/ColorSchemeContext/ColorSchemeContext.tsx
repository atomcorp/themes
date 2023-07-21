'use client';

import {createContext, Dispatch, ReactNode, useReducer} from 'react';

import {colorSchemeAndMeta} from '@/types';
import {
  ColorSchemeAction,
  colorSchemeReducer,
  colorSchemeReducerInitialiser,
  ColorSchemeState,
} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

export const ColorSchemeStateContext = createContext<
  ColorSchemeState | undefined
>(undefined);
export const SetColorSchemeStateContext = createContext<
  Dispatch<ColorSchemeAction> | undefined
>(undefined);

type ColorSchemesProviderProps = {
  children: ReactNode;
  colorSchemes: colorSchemeAndMeta[];
};

const initState: ColorSchemeState = {
  activeColorScheme: {} as colorSchemeAndMeta,
  lightness: 'dark',
  lightColorSchemes: [],
  darkColorSchemes: [],
  colorSchemes: [],
};

export const ColorSchemesProvider = (props: ColorSchemesProviderProps) => {
  const [state, dispatch] = useReducer(colorSchemeReducer, initState, () =>
    colorSchemeReducerInitialiser(props.colorSchemes)
  );

  return (
    <ColorSchemeStateContext.Provider value={state}>
      <SetColorSchemeStateContext.Provider value={dispatch}>
        {props.children}
      </SetColorSchemeStateContext.Provider>
    </ColorSchemeStateContext.Provider>
  );
};
