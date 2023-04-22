'use client';

import {createContext, ReactNode, useState, useCallback} from 'react';

import {colorSchemeAndMeta} from '@/types';

export const CopiedThemeNamesContext = createContext<
  colorSchemeAndMeta['name'][]
>([]);
export const SetCopiedThemeNamesContext = createContext<
  ((name: colorSchemeAndMeta['name']) => void) | undefined
>(undefined);
export const RemoveCopiedThemeNamesContext = createContext<
  ((name: colorSchemeAndMeta['name']) => void) | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

const CopyColorSchemeContext = (props: Props) => {
  const [copiedThemeNames, setCopiedThemeNames] = useState<
    colorSchemeAndMeta['name'][]
  >([]);
  const addToCopiedThemeNames = useCallback(
    (name: colorSchemeAndMeta['name']) => {
      setCopiedThemeNames((prevThemeNames) => {
        if (!prevThemeNames.includes(name)) {
          return [...prevThemeNames, name];
        }
        return prevThemeNames;
      });
    },
    []
  );
  const removeFromCopiedThemeNames = useCallback(
    (name: colorSchemeAndMeta['name']) => {
      setCopiedThemeNames((prev) => prev.filter((n) => n !== name));
    },
    []
  );
  return (
    <CopiedThemeNamesContext.Provider value={copiedThemeNames}>
      <SetCopiedThemeNamesContext.Provider value={addToCopiedThemeNames}>
        <RemoveCopiedThemeNamesContext.Provider
          value={removeFromCopiedThemeNames}
        >
          {props.children}
        </RemoveCopiedThemeNamesContext.Provider>
      </SetCopiedThemeNamesContext.Provider>
    </CopiedThemeNamesContext.Provider>
  );
};

export default CopyColorSchemeContext;
