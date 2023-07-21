'use client';

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import {colorSchemeAndMeta} from '@/types';

export const CopiedThemeNamesContext = createContext<
  colorSchemeAndMeta['name'][]
>([]);
export const SetCopiedThemeNamesContext = createContext<
  Dispatch<SetStateAction<colorSchemeAndMeta['name'][]>> | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

const CopyColorSchemeProvider = (props: Props) => {
  const [copiedThemeNames, setCopiedThemeNames] = useState<
    colorSchemeAndMeta['name'][]
  >([]);
  return (
    <CopiedThemeNamesContext.Provider value={copiedThemeNames}>
      <SetCopiedThemeNamesContext.Provider value={setCopiedThemeNames}>
        {props.children}
      </SetCopiedThemeNamesContext.Provider>
    </CopiedThemeNamesContext.Provider>
  );
};

export default CopyColorSchemeProvider;
