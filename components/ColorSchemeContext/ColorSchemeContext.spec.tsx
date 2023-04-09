import {test, expect} from '@playwright/experimental-ct-react';
import ConsumerTestComponent from './ColorSchemeContextTestHelper';

test('should show first theme by default', async ({mount}) => {
  const themes = [
    {
      name: 'Light theme',
    },
    {
      name: 'Solarized Dark',
    },
  ];
  const component = await mount(<ConsumerTestComponent />, {
    hooksConfig: {colorSchemes: themes},
  });
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Light theme'
  );
});

test('should change theme', async ({mount}) => {
  const themes = [
    {
      name: 'Light theme',
    },
    {
      name: 'Solarized Dark',
    },
  ];
  const component = await mount(<ConsumerTestComponent />, {
    hooksConfig: {colorSchemes: themes},
  });
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Light theme'
  );
  await component.getByRole('button').click();
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Solarized Dark'
  );
});
