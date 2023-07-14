import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import {lightThemeA} from '@/utilities/mockColorSchemes';
import {
  ColorSchemeStateContext,
  SetColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';

import CurrentColorScheme from './CurrentColorScheme';
import {ColorSchemeState} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

const colorSchemeState: ColorSchemeState = {
  currentColorScheme: lightThemeA,
  currentLightness: 'light',
  lightColorSchemes: [lightThemeA],
  darkColorSchemes: [],
  colorSchemes: [lightThemeA],
};

const dispatch = jest.fn();

it('should render the current color scheme', () => {
  render(
    <ColorSchemeStateContext.Provider value={colorSchemeState}>
      <SetColorSchemeStateContext.Provider value={dispatch}>
        <CurrentColorScheme>
          <div />
        </CurrentColorScheme>
      </SetColorSchemeStateContext.Provider>
    </ColorSchemeStateContext.Provider>
  );

  expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
    lightThemeA.name
  );
});
