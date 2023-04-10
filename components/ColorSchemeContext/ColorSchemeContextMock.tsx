// this is a helper file to allow Playwright to test the ColorSchemeContext
// see: https://playwright.dev/docs/next/test-components#under-the-hood
'use client';

import {useContext} from 'react';

import {
  CurrentColorSchemeContext,
  SetCurrentColorSchemeContext,
} from './ColorSchemeContext';

type Props = {
  nextColorScheme: string;
};

const ColorSchemeContextMock = (props: Props) => {
  const colorScheme = useContext(CurrentColorSchemeContext);
  const setCurrentColorSchemeName = useContext(SetCurrentColorSchemeContext);
  return (
    <>
      <h1>{colorScheme.name}</h1>
      <button
        onClick={() => {
          setCurrentColorSchemeName(props.nextColorScheme);
        }}
      >
        Change name
      </button>
    </>
  );
};

export default ColorSchemeContextMock;
