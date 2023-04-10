// test for getColorSchemes.ts
import getColorSchemes from './getColorSchemes';
import {colorSchemeAndMeta} from '@/types';
import {themes} from '@/utilities/example-themes';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(themes),
  })
) as jest.Mock;

test('getColorSchemes', async () => {
  const colorSchemes = await getColorSchemes();
  expect(colorSchemes).toEqual(themes);
});
