import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import LayoutWrapper from '../LayoutWrapper';

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
  previewType: 'terminal',
};

const dispatch = jest.fn();

const MockActiveColorSchemeName = () => {
  const {
    colorSchemeState: {activeColorScheme, lightness},
  } = useColorSchemes();
  const cssVarColors = getColorsForCssVars(activeColorScheme);
  const colors = Object.entries(cssVarColors);
  return (
    <ul id="root" style={cssVarColors}>
      <li>Lightness: {lightness}</li>
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
        <LayoutWrapper>
          <MockActiveColorSchemeName />
        </LayoutWrapper>
      </SetColorSchemeStateContext.Provider>
    </ColorSchemeStateContext.Provider>
  );

  // Jest uses JS Dom which doesn't support CSS Variables, so this is fairly hollow test
  expect(screen.getByRole('list')).toMatchSnapshot();
});
