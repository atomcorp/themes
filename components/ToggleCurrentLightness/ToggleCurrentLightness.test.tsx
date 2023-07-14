import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleCurrentLightness from './ToggleCurrentLightness';
import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {darkThemeA, lightThemeA} from '@/utilities/mockColorSchemes';

const ProviderWrapper = () => (
  <ColorSchemesProvider colorSchemes={[darkThemeA, lightThemeA]}>
    <ToggleCurrentLightness />
  </ColorSchemesProvider>
);

test('should default to dark', () => {
  render(<ProviderWrapper />);

  expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
  expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
});

test('should toggle to light', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('button', {name: 'Light'}));
  await waitFor(() => {
    expect(screen.getByRole('button', {name: 'Light'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Dark'})).not.toBeDisabled();
  });
});

test('should toggle to dark', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('button', {name: 'Light'}));
  await user.click(screen.getByRole('button', {name: 'Dark'}));

  expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
  expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
});
