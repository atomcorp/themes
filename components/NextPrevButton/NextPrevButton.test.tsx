import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';

import NextPrevButton from './NextPrevButton';
import {SetNextPrevColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import userEvent from '@testing-library/user-event';

test('should render next button', async () => {
  const setNextPrevColorScheme = jest.fn();
  render(
    <SetNextPrevColorSchemeContext.Provider value={setNextPrevColorScheme}>
      <NextPrevButton direction="next" colorSchemes={[]} />
    </SetNextPrevColorSchemeContext.Provider>
  );

  expect(screen.getByRole('button', {name: 'Next'})).toBeInTheDocument();
});

test('should render prev button', async () => {
  const setNextPrevColorScheme = jest.fn();
  render(
    <SetNextPrevColorSchemeContext.Provider value={setNextPrevColorScheme}>
      <NextPrevButton direction="prev" colorSchemes={[]} />
    </SetNextPrevColorSchemeContext.Provider>
  );

  expect(screen.getByRole('button', {name: 'Prev'})).toBeInTheDocument();
});

test('should call setNextPrevColorScheme with next', async () => {
  const user = userEvent.setup();
  const setNextPrevColorScheme = jest.fn();
  render(
    <SetNextPrevColorSchemeContext.Provider value={setNextPrevColorScheme}>
      <NextPrevButton direction="next" colorSchemes={[]} />
    </SetNextPrevColorSchemeContext.Provider>
  );

  user.click(screen.getByRole('button', {name: 'Next'}));

  await waitFor(() => {
    expect(setNextPrevColorScheme).toHaveBeenCalledWith('next');
  });
});

test('should call setNextPrevColorScheme with prev', async () => {
  const user = userEvent.setup();
  const setNextPrevColorScheme = jest.fn();
  render(
    <SetNextPrevColorSchemeContext.Provider value={setNextPrevColorScheme}>
      <NextPrevButton direction="prev" colorSchemes={[]} />
    </SetNextPrevColorSchemeContext.Provider>
  );

  user.click(screen.getByRole('button', {name: 'Prev'}));

  await waitFor(() => {
    expect(setNextPrevColorScheme).toHaveBeenCalledWith('prev');
  });
});
