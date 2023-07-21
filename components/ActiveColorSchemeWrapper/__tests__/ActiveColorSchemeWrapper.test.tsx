import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import CurrentColorScheme from '../ActiveColorSchemeWrapper';

import {
  ColorSchemeStateContext,
  SetColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {ColorSchemeState} from '@/components/ColorSchemeContext/colorSchemeContextReducer';
import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import {lightThemeA} from '@/utilities/mockColorSchemes';
import getColorsForCssVars from '@/utilities/getColorsForCssVars';

const colorSchemeState: ColorSchemeState = {
  activeColorScheme: lightThemeA,
  lightness: 'light',
  lightColorSchemes: [lightThemeA],
  darkColorSchemes: [],
  colorSchemes: [lightThemeA],
};

const dispatch = jest.fn();

const MockActiveColorSchemeName = () => {
  const {
    colorSchemeState: {activeColorScheme},
  } = useColorSchemes();
  const cssVarColors = getColorsForCssVars(activeColorScheme);
  const colors = Object.entries(cssVarColors);
  return (
    <ul style={cssVarColors}>
      {colors.map(([key, value], i) => {
        return (
          <li key={i}>
            {key} == {value}
          </li>
        );
      })}
    </ul>
  );
};

it('should render the current color scheme', () => {
  render(
    <ColorSchemeStateContext.Provider value={colorSchemeState}>
      <SetColorSchemeStateContext.Provider value={dispatch}>
        <CurrentColorScheme>
          <MockActiveColorSchemeName />
        </CurrentColorScheme>
      </SetColorSchemeStateContext.Provider>
    </ColorSchemeStateContext.Provider>
  );

  // Jest uses JS Dom which doesn't support CSS Variables, so this is fairly hollow test
  expect(screen.getByRole('list')).toMatchSnapshot();
});
