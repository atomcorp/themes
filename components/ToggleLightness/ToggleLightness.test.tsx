import '@testing-library/jest-dom';
import '@/utilities/mock-resizeobserver';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleLightness from './ToggleLightness';
import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {darkThemeA, lightThemeA} from '@/utilities/mockColorSchemes';

const ProviderWrapper = () => (
  <ColorSchemesProvider colorSchemes={[darkThemeA, lightThemeA]}>
    <ToggleLightness />
  </ColorSchemesProvider>
);

test('should default to dark', () => {
  render(<ProviderWrapper />);

  expect(screen.getByRole('radio', {name: 'Light'})).not.toBeChecked();
  expect(screen.getByRole('radio', {name: 'Dark'})).toBeChecked();
});

test('should toggle to light', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('radio', {name: 'Light'}));
  await waitFor(() => {
    expect(screen.getByRole('radio', {name: 'Light'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'Dark'})).not.toBeChecked();
  });
});

test('should toggle to dark', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('radio', {name: 'Light'}));
  await user.click(screen.getByRole('radio', {name: 'Dark'}));

  expect(screen.getByRole('radio', {name: 'Dark'})).toBeChecked();
  expect(screen.getByRole('radio', {name: 'Light'})).not.toBeChecked();
});
