import {test, expect} from '@playwright/experimental-ct-react';
import Title from './Title';

test.use({viewport: {width: 500, height: 500}});

test('should show title in a h1', async ({mount}) => {
  const component = await mount(<Title />);
  await expect(component.getByRole('heading', {level: 1})).toHaveText(
    'Windows Terminal Colors'
  );
});
