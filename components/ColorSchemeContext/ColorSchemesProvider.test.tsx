// test ColorSchemesProvider
//
//
import '@testing-library/jest-dom';

import {themes} from '@/utilities/example-themes';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CurrentColorSchemeContext,
  SetCurrentColorSchemeContext,
  CurrentLightnessContext,
  SetCurrentLightnessContext,
  SetNextPrevColorSchemeContext,
  LightColorSchemesContext,
  DarkColorSchemesContext,
  ColorSchemesProvider,
} from './ColorSchemeContext';

it('should render', () => {
  render(
    <ColorSchemesProvider colorSchemes={themes}>
      <h1>Hello World</h1>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    'Hello World'
  );
});

it('should set the current color scheme context', () => {
  render(
    <ColorSchemesProvider colorSchemes={themes}>
      <CurrentColorSchemeContext.Consumer>
        {(currentColorScheme) => <h1>{currentColorScheme?.name}</h1>}
      </CurrentColorSchemeContext.Consumer>
    </ColorSchemesProvider>
  );
  const firstDarkTheme = themes.find((theme) => theme.meta.isDark);
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstDarkTheme?.name || ''
  );
});

it('should set the current lightness context', () => {
  render(
    <ColorSchemesProvider colorSchemes={themes}>
      <CurrentLightnessContext.Consumer>
        {(currentLightness) => <h1>{currentLightness}</h1>}
      </CurrentLightnessContext.Consumer>
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('dark');
});

it('should set the set current color scheme context', async () => {
  const user = userEvent.setup();
  const firstDarkTheme = themes.find((theme) => theme.meta.isDark);
  const secondDarkTheme = themes.find(
    (theme) => theme.meta.isDark && theme.name !== firstDarkTheme?.name
  );

  const secondDarkThemeName = secondDarkTheme?.name || '';

  render(
    <ColorSchemesProvider colorSchemes={themes}>
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
  const firstLightTheme = themes.find((theme) => !theme.meta.isDark);
  const firstLightThemeName = firstLightTheme?.name || '';
  render(
    <ColorSchemesProvider colorSchemes={themes}>
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
  const firstDarkTheme = themes.find((theme) => theme.meta.isDark);
  const firstDarkThemeName = firstDarkTheme?.name || '';
  render(
    <ColorSchemesProvider colorSchemes={themes}>
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

// describe('ColorSchemesProvider', () => {
// it('should set the current color scheme', () => {
//   const {result} = renderHook(
//     () => useContext(CurrentColorSchemeContext),
//     {
//       wrapper: ({children}) => (
//         <ColorSchemesProvider colorSchemes={colorSchemes}>
//           {children}
//         </ColorSchemesProvider>
//       ),
//     }
//   );
//   expect(result.current.name).toBe('default');
//   act(() => {
//     const {result: result2} = renderHook(
//       () => useContext(SetCurrentColorSchemeContext),
//       {
//         wrapper: ({children}) => (
//           <ColorSchemesProvider colorSchemes={colorSchemes}>
//             {children}
//           </ColorSchemesProvider>
//         ),
//       }
//     );
//     result2.current('solarized-dark');
//   });
//   expect(result.current.name).toBe('solarized-dark');
// });
// it('should set the current lightness', () => {
//   const {result} = renderHook(
//     () => useContext(CurrentLightnessContext),
//     {
//       wrapper: ({children}) => (
//         <ColorSchemesProvider colorSchemes={colorSchemes}>
//           {children}
//         </ColorSchemesProvider>
//       ),
//     }
//   );
//   expect(result.current).toBe('dark');
//   act(() => {
//     const {result: result2} = renderHook(
//       () => useContext(SetCurrentLight
