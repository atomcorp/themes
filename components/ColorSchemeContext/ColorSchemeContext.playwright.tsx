import {test, expect} from '@playwright/experimental-ct-react';
import ColorSchemeContextMock from './ColorSchemeContextMock';

const themes = [
  {
    name: 'Dark theme',
    meta: {
      isDark: true,
    },
  },
  {
    name: 'Solarized Dark',
    meta: {
      isDark: true,
    },
  },
];

test('should show first theme by default', async ({mount}) => {
  const component = await mount(<ColorSchemeContextMock nextColorScheme="" />, {
    hooksConfig: {colorSchemes: themes},
  });
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Dark theme'
  );
});

test('should change theme', async ({mount}) => {
  const component = await mount(
    <ColorSchemeContextMock nextColorScheme="Solarized Dark" />,
    {
      hooksConfig: {colorSchemes: themes},
    }
  );
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Dark theme'
  );
  await component.getByRole('button').click();
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Solarized Dark'
  );
});
