// Import styles, initialize component theme here.
// import '../src/common.css';
// playwright/index.tsx
import {ColorSchemesProvider} from '../components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';
import {beforeMount} from '@playwright/experimental-ct-react/hooks';

type TestTheme = {
  name: string;
};

export type HooksConfig = {
  colorSchemes?: TestTheme[];
};

beforeMount<HooksConfig>(async ({App, hooksConfig}) => {
  if (hooksConfig?.colorSchemes) {
    return (
      <ColorSchemesProvider
        colorSchemes={hooksConfig.colorSchemes as colorSchemeAndMeta[]}
      >
        <App />
      </ColorSchemesProvider>
    );
  }
});
