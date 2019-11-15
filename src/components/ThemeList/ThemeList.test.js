import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ThemeList from './ThemeList';

const themes = ['3024 Day', '3024 Night', 'AdventureTime'];

it('Renders a list', () => {
  const setActiveTheme = jest.fn();

  const {getByLabelText, getAllByLabelText} = render(
    <ThemeList
      themeNames={themes}
      activeTheme="AdventureTime"
      setActiveTheme={setActiveTheme}
    />
  );
  const radios = getAllByLabelText((labelText) => themes.includes(labelText));
  expect(radios.length).toBe(3);
  expect(getByLabelText('AdventureTime').checked).toBe(true);
  expect(getByLabelText('3024 Night').checked).toBe(false);
  expect(getByLabelText('3024 Day').checked).toBe(false);
  fireEvent.click(getByLabelText('3024 Night'), {
    target: {checked: true},
  });
  expect(getByLabelText('3024 Night').checked).toBe(true);
  expect(getByLabelText('AdventureTime').checked).toBe(false);
});
