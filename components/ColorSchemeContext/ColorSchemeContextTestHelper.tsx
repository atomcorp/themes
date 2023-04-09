// this is a helper file to allow Playwright to test the ColorSchemeContext
// see: https://playwright.dev/docs/next/test-components#under-the-hood
'use client';

import {useContext} from 'react';

import {
  CurrentColorSchemeContext,
  SetCurrentColorSchemeContext,
} from './ColorSchemeContext';

const ConsumerTestComponent = () => {
  const colorSchemeName = useContext(CurrentColorSchemeContext);
  const setCurrentColorSchemeName = useContext(SetCurrentColorSchemeContext);
  return (
    <>
      <h1>{colorSchemeName}</h1>
      <button
        onClick={() => {
          setCurrentColorSchemeName('Solarized Dark');
        }}
      >
        Change name
      </button>
    </>
  );
};

export default ConsumerTestComponent;
