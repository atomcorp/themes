// tests for AddColorSchemeButton.tsx, ListCopiedColorSchemes.tsx, and RemoveColorSchemeButton.tsx
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CopyColorSchemeProvider from '@/components/CopyColorSchemeContext/CopyColorSchemeProvider';
import AddColorSchemeButton from './AddColorSchemeButton';
import ListCopiedColorSchemes from './ListCopiedColorSchemes';
import RemoveColorSchemeButton from './RemoveColorSchemeButton';
import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {schemes} from '@/utilities/mockColorSchemes';
import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';

const firstDarkTheme = schemes.find((theme) => theme.meta.isDark);

const ProviderWrapper = () => {
  return (
    <ColorSchemesProvider colorSchemes={schemes}>
      <CopyColorSchemeProvider>
        <AddColorSchemeButton />
        <ListCopiedColorSchemes />
        <RemoveColorSchemeButton />
        <MockDuplicateAddButton />
      </CopyColorSchemeProvider>
    </ColorSchemesProvider>
  );
};

const MockDuplicateAddButton = () => {
  const {addToCopiedThemeNames} = useCopiedColorSchemes();
  return (
    <button
      onClick={() => {
        if (firstDarkTheme?.name) {
          addToCopiedThemeNames(firstDarkTheme.name);
        }
      }}
    >
      Force attempt to add first theme
    </button>
  );
};

test('it should render all the ui', () => {
  render(<ProviderWrapper />);
  expect(
    screen.getByRole('button', {name: `Add ${firstDarkTheme?.name} to list`})
  ).toBeTruthy();
});

test('it add item to list', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);

  await user.click(
    screen.getByRole('button', {
      name: `Add ${firstDarkTheme?.name} to list`,
    })
  );
  const listItems = screen.getAllByRole('listitem');
  const listTextContents = listItems.map((listItem) => listItem.textContent);
  expect(listTextContents).toEqual([firstDarkTheme?.name]);
});

test('it should toggle add/remove buttons  when item is added', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);
  const addButton = screen.getByRole('button', {
    name: `Add ${firstDarkTheme?.name} to list`,
  });
  const removeButton = screen.getByRole('button', {
    name: `Remove ${firstDarkTheme?.name} from list`,
  });
  expect(removeButton).toBeDisabled();
  expect(addButton).toBeEnabled();

  await user.click(addButton);

  expect(removeButton).toBeEnabled();
  expect(addButton).toBeDisabled();

  await user.click(removeButton);

  expect(removeButton).toBeDisabled();
  expect(addButton).toBeEnabled();
});

test('it should not add duplicate items', async () => {
  const user = userEvent.setup();
  render(<ProviderWrapper />);
  const addButton = screen.getByRole('button', {
    name: `Add ${firstDarkTheme?.name} to list`,
  });
  await user.click(addButton);

  const listItems = screen.getAllByRole('listitem');
  const listTextContents = listItems.map((listItem) => listItem.textContent);
  expect(listTextContents).toEqual([firstDarkTheme?.name]);

  await user.click(
    screen.getByRole('button', {
      name: 'Force attempt to add first theme',
    })
  );

  const listItems2 = screen.getAllByRole('listitem');
  const listText2Contents = listItems2.map((listItem) => listItem.textContent);
  expect(listText2Contents).toEqual([firstDarkTheme?.name]);
});
