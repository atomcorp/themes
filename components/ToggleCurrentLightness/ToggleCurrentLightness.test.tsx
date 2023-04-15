import React from 'react';

import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleCurrentLightness from './ToggleCurrentLightness';
import {
  CurrentLightnessContext,
  SetCurrentLightnessContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {Lightness} from '@/types';

type Props = {
  mock: jest.Mock;
};

const MockContext = (props: Props) => {
  const [currentLightness, setCurrentLightness] =
    React.useState<Lightness>('dark');
  const toggleCurrentLightness = (lightness: Lightness) => {
    props.mock(lightness);
    setCurrentLightness(currentLightness === 'dark' ? 'light' : 'dark');
  };
  return (
    <CurrentLightnessContext.Provider value={currentLightness}>
      <SetCurrentLightnessContext.Provider value={toggleCurrentLightness}>
        <ToggleCurrentLightness />
      </SetCurrentLightnessContext.Provider>
    </CurrentLightnessContext.Provider>
  );
};

test('should default to dark', () => {
  const setCurrentLightness = jest.fn();
  render(<MockContext mock={setCurrentLightness} />);

  expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
  expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
});

test('should toggle to light', async () => {
  const user = userEvent.setup();
  const setCurrentLightness = jest.fn();
  render(<MockContext mock={setCurrentLightness} />);

  await user.click(screen.getByRole('button', {name: 'Light'}));
  expect(setCurrentLightness).toHaveBeenCalledWith('light');
  await waitFor(() => {
    expect(screen.getByRole('button', {name: 'Light'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Dark'})).not.toBeDisabled();
  });
});

test('should toggle to dark', async () => {
  const user = userEvent.setup();
  const setCurrentLightness = jest.fn();
  render(<MockContext mock={setCurrentLightness} />);

  await user.click(screen.getByRole('button', {name: 'Light'}));
  await user.click(screen.getByRole('button', {name: 'Dark'}));

  await waitFor(() => {
    expect(setCurrentLightness).toHaveBeenCalledWith('dark');
  });
  expect(screen.getByRole('button', {name: 'Dark'})).toBeDisabled();
  expect(screen.getByRole('button', {name: 'Light'})).not.toBeDisabled();
});
