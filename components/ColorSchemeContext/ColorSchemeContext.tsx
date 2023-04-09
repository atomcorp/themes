'use client';

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import {colourShemeAndMeta} from '@/types';

export const CurrentColorSchemeContext =
  createContext<colourShemeAndMeta['name']>('');
export const SetCurrentColorSchemeContext = createContext<
  Dispatch<SetStateAction<colourShemeAndMeta['name']>>
>(() => {});

type ColorSchemesProviderProps = {
  children: ReactNode;
  colorSchemes: colourShemeAndMeta[];
};

export const ColorSchemesProvider = (props: ColorSchemesProviderProps) => {
  const [currentColorScheme, setCurrentColorScheme] = useState(
    props.colorSchemes[0].name
  );

  return (
    <CurrentColorSchemeContext.Provider value={currentColorScheme}>
      <SetCurrentColorSchemeContext.Provider value={setCurrentColorScheme}>
        {props.children}
      </SetCurrentColorSchemeContext.Provider>
    </CurrentColorSchemeContext.Provider>
  );
};
