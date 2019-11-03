import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ThemeList from './ThemeList';

const themes = ['3024 Day', '3024 Night', 'AdventureTime'];

it('Renders a list', () => {
  const setActiveTheme = jest.fn();

  const component = render(
    <ThemeList
      themeNames={themes}
      activeTheme="AdventureTime"
      setActiveTheme={setActiveTheme}
    />
  );
  const radios = component.getAllByLabelText((labelText) =>
    themes.includes(labelText)
  );
  expect(radios.length).toBe(3);
  expect(component.getByDisplayValue('AdventureTime').checked).toBe(true);
  expect(component.getByDisplayValue('3024 Night').checked).toBe(false);
  expect(component.getByDisplayValue('3024 Day').checked).toBe(false);
  fireEvent.change(component.getByDisplayValue('3024 Night'), {
    target: {checked: true},
  });
  expect(component.getByDisplayValue('3024 Night').checked).toBe(true);
  expect(component.getByDisplayValue('AdventureTime').checked).toBe(false);
});
