import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {ReactNode} from 'react';
import userEvent from '@testing-library/user-event';

import NextPrevButton from './NextPrevButton';
import {
  SetColorSchemeStateContext,
  ColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {ColorSchemeState} from '@/components/ColorSchemeContext/colorSchemeContextReducer';
import {colorSchemeAndMeta} from '@/types';

const mockTheme = {} as colorSchemeAndMeta;

const colorSchemeState: ColorSchemeState = {
  activeColorScheme: mockTheme,
  lightness: 'dark',
  lightColorSchemes: [mockTheme],
  darkColorSchemes: [],
  colorSchemes: [mockTheme],
};

test('should render next button', () => {
  render(
    <ProviderWrapper>
      <NextPrevButton direction="next" />
    </ProviderWrapper>
  );

  expect(screen.getByRole('button', {name: 'Next'})).toBeInTheDocument();
});

test('should render prev button', () => {
  render(
    <ProviderWrapper>
      <NextPrevButton direction="prev" />
    </ProviderWrapper>
  );

  expect(screen.getByRole('button', {name: 'Prev'})).toBeInTheDocument();
});

test('should call setNextPrevColorScheme with next', async () => {
  const user = userEvent.setup();
  const setNextPrevColorScheme = jest.fn();
  render(
    <ProviderWrapper dispatch={setNextPrevColorScheme}>
      <NextPrevButton direction="next" />
    </ProviderWrapper>
  );

  await user.click(screen.getByRole('button', {name: 'Next'}));

  await waitFor(() => {
    expect(setNextPrevColorScheme).toHaveBeenCalledWith(getAction('next'));
  });
});

test('should call setNextPrevColorScheme with prev', async () => {
  const user = userEvent.setup();
  const setNextPrevColorScheme = jest.fn();
  render(
    <ProviderWrapper dispatch={setNextPrevColorScheme}>
      <NextPrevButton direction="prev" />
    </ProviderWrapper>
  );

  await user.click(screen.getByRole('button', {name: 'Prev'}));

  await waitFor(() => {
    expect(setNextPrevColorScheme).toHaveBeenCalledWith(getAction('prev'));
  });
});

const ProviderWrapper = ({
  dispatch = () => null,
  children,
}: {
  dispatch?: () => null | jest.Mock;
  children: ReactNode;
}) => (
  <ColorSchemeStateContext.Provider value={colorSchemeState}>
    <SetColorSchemeStateContext.Provider value={dispatch}>
      {children}
    </SetColorSchemeStateContext.Provider>
  </ColorSchemeStateContext.Provider>
);

const getAction = (direction: 'next' | 'prev') => ({
  payload: {direction},
  type: 'setNextPrevColorScheme',
});
