import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ColorSchemeSelector from './ColorSchemeSelector';
import {
  darkThemeA,
  darkThemeB,
  lightThemeA,
  schemes,
} from '@/utilities/mockColorSchemes';
import {
  ColorSchemesProvider,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import userEvent from '@testing-library/user-event';
import filterColorSchemes from '@/utilities/filterColorSchemes';

const {lightColorSchemes, darkColorSchemes} = filterColorSchemes(schemes);

it('should render the current color scheme', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <ColorSchemeSelector
        lightColorSchemes={lightColorSchemes}
        darkColorSchemes={darkColorSchemes}
      />
    </ColorSchemesProvider>
  );

  expect(screen.getByRole('combobox')).toHaveValue(darkThemeA.name);
});

it('should render the combo box when lightness is light', async () => {
  const user = userEvent.setup();
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <ColorSchemeSelector
        lightColorSchemes={lightColorSchemes}
        darkColorSchemes={darkColorSchemes}
      />
      <SetCurrentLightnessContext.Consumer>
        {(currentLightness) => (
          <button
            onClick={() => {
              currentLightness && currentLightness('light');
            }}
          >
            Light theme
          </button>
        )}
      </SetCurrentLightnessContext.Consumer>
    </ColorSchemesProvider>
  );

  await user.click(screen.getByRole('button', {name: 'Light theme'}));
  expect(screen.getByRole('combobox')).toHaveValue(lightThemeA.name);
});

it('should change the color scheme when the combo box is changed', async () => {
  const user = userEvent.setup();
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <ColorSchemeSelector
        lightColorSchemes={lightColorSchemes}
        darkColorSchemes={darkColorSchemes}
      />
    </ColorSchemesProvider>
  );

  await user.selectOptions(screen.getByRole('combobox'), darkThemeB.name);
  expect(screen.getByRole('combobox')).toHaveValue(darkThemeB.name);
});
