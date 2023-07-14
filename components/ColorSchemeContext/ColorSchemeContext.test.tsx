import '@testing-library/jest-dom';

import {schemes} from '@/utilities/mockColorSchemes';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ColorSchemesProvider} from './ColorSchemeContext';
import useColorSchemes from './useColorSchemes';

const ColorSchemesDisplayMock = () => {
  const {colorSchemeState, setCurrentLightness, setNextPrevColorScheme} =
    useColorSchemes();
  return (
    <main>
      <h1>{colorSchemeState.currentColorScheme.name}</h1>
      <h2>{colorSchemeState.currentLightness}</h2>
      <div role="alert">Hello World</div>
      <button
        onClick={() => {
          setCurrentLightness('light');
        }}
      >
        Set light lightness
      </button>
      <button
        onClick={() => {
          setCurrentLightness('dark');
        }}
      >
        Set dark lightness
      </button>
      <button
        onClick={() => {
          setNextPrevColorScheme('next');
        }}
      >
        Next theme
      </button>
    </main>
  );
};

it('should render', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <ColorSchemesDisplayMock />
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('alert')).toHaveTextContent('Hello World');
});

it('should set the current color scheme context', () => {
  render(
    <ColorSchemesProvider colorSchemes={schemes}>
      <ColorSchemesDisplayMock />
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
      <ColorSchemesDisplayMock />
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('dark');
  expect(screen.getByRole('heading', {level: 2})).not.toHaveTextContent(
    'light'
  );
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
      <ColorSchemesDisplayMock />
    </ColorSchemesProvider>
  );
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    firstDarkTheme?.name || ''
  );
  await user.click(screen.getByRole('button', {name: 'Next theme'}));

  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
    secondDarkThemeName
  );
});
