import React from 'react';

import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleCurrentLightness from './ToggleCurrentLightness';
import {
  CurrentLightnessContext,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';

test('should default to dark', async () => {
  const user = userEvent.setup();
  const setCurrentLightness = jest.fn();
  render(
    <CurrentLightnessContext.Provider value="dark">
      <SetCurrentLightnessContext.Provider value={setCurrentLightness}>
        <ToggleCurrentLightness />
      </SetCurrentLightnessContext.Provider>
    </CurrentLightnessContext.Provider>
  );

  expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
  expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
});

test('should toggle to light', async () => {
  const user = userEvent.setup();
  const setCurrentLightness = jest.fn();
  render(
    <CurrentLightnessContext.Provider value="dark">
      <SetCurrentLightnessContext.Provider value={setCurrentLightness}>
        <ToggleCurrentLightness />
      </SetCurrentLightnessContext.Provider>
    </CurrentLightnessContext.Provider>
  );

  await user.click(screen.getByRole('button', {name: 'Light'}));
  expect(setCurrentLightness).toHaveBeenCalledWith('light');
  waitFor(() => {
    expect(screen.getByRole('button', {name: 'Light'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Dark'})).not.toBeDisabled();
  });
});

test('should toggle to dark', async () => {
  const user = userEvent.setup();
  const setCurrentLightness = jest.fn();
  render(
    <CurrentLightnessContext.Provider value="light">
      <SetCurrentLightnessContext.Provider value={setCurrentLightness}>
        <ToggleCurrentLightness />
      </SetCurrentLightnessContext.Provider>
    </CurrentLightnessContext.Provider>
  );

  await user.click(screen.getByRole('button', {name: 'Dark'}));

  waitFor(() => {
    expect(setCurrentLightness).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
    expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
  });
});
