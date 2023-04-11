import '@testing-library/jest-dom';

import {schemes} from '@/utilities/mockColorSchemes';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CurrentColorSchemeContext,
  SetCurrentColorSchemeContext,
  CurrentLightnessContext,
  LightColorSchemesContext,
  DarkColorSchemesContext,
  ColorSchemesProvider,
} from './ColorSchemeContext';

it('should render', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <h1>Hello World</h1>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    'Hello World'
  );
});

it('should set the current color scheme context', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <CurrentColorSchemeContext.Consumer>
        {(currentColorScheme) => <h1>{currentColorScheme?.name}</h1>}
      </CurrentColorSchemeContext.Consumer>
    </ColorSchemesProvider>
  );
  const firstDarkTheme = schemes.find((theme) => theme.meta.isDark);
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstDarkTheme?.name || ''
  );
});

it('should set the current lightness context', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <CurrentLightnessContext.Consumer>
        {(currentLightness) => <h1>{currentLightness}</h1>}
      </CurrentLightnessContext.Consumer>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('dark');
});

it('should set the set current color scheme context', async () => {
  const user = userEvent.setup();
  const firstDarkTheme = schemes.find((theme) => theme.meta.isDark);
  const secondDarkTheme = schemes.find(
    (theme) => theme.meta.isDark && theme.name !== firstDarkTheme?.name
  );

  const secondDarkThemeName = secondDarkTheme?.name || '';

  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <CurrentColorSchemeContext.Consumer>
        {(currentColorScheme) => <h1>{currentColorScheme?.name}</h1>}
      </CurrentColorSchemeContext.Consumer>
      <SetCurrentColorSchemeContext.Consumer>
        {(setCurrentColorScheme) => (
          <button
            onClick={() =>
              setCurrentColorScheme &&
              setCurrentColorScheme(secondDarkThemeName)
            }
          >
            Click Me
          </button>
        )}
      </SetCurrentColorSchemeContext.Consumer>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstDarkTheme?.name || ''
  );
  await user.click(screen.getByRole('button', {name: 'Click Me'}));

  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    secondDarkThemeName
  );
});

it('should show the LightColorSchemesContext ', async () => {
  const firstLightTheme = schemes.find((theme) => !theme.meta.isDark);
  const firstLightThemeName = firstLightTheme?.name || '';
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <LightColorSchemesContext.Consumer>
        {(lightColorSchemes) => (
          <h1>{lightColorSchemes && lightColorSchemes[0].name}</h1>
        )}
      </LightColorSchemesContext.Consumer>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstLightThemeName
  );
});

it('should show the DarkColorSchemesContext ', async () => {
  const firstDarkTheme = schemes.find((theme) => theme.meta.isDark);
  const firstDarkThemeName = firstDarkTheme?.name || '';
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <DarkColorSchemesContext.Consumer>
        {(darkColorSchemes) => (
          <h1>{darkColorSchemes && darkColorSchemes[0].name}</h1>
        )}
      </DarkColorSchemesContext.Consumer>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstDarkThemeName
  );
});
