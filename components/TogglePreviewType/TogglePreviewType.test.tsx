import '@testing-library/jest-dom';
import '@/utilities/mock-resizeobserver';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TogglePreviewType from './TogglePreviewType';
import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {darkThemeA, lightThemeA} from '@/utilities/mockColorSchemes';

const ProviderWrapper = () => (
  <ColorSchemesProvider colorSchemes={[darkThemeA, lightThemeA]}>
    <TogglePreviewType />
  </ColorSchemesProvider>
);

test('should default to dark', () => {
  render(<ProviderWrapper />);

  expect(screen.getByRole('radio', {name: 'Chalk'})).not.toBeChecked();
  expect(screen.getByRole('radio', {name: 'Terminal'})).toBeChecked();
});

test('should toggle to light', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('radio', {name: 'Terminal'}));
  await waitFor(() => {
    expect(screen.getByRole('radio', {name: 'Terminal'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'Chalk'})).not.toBeChecked();
  });
});

test('should toggle to dark', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(screen.getByRole('radio', {name: 'Terminal'}));
  await user.click(screen.getByRole('radio', {name: 'Chalk'}));

  expect(screen.getByRole('radio', {name: 'Chalk'})).toBeChecked();
  expect(screen.getByRole('radio', {name: 'Terminal'})).not.toBeChecked();
});
