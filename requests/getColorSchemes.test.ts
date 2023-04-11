// test for getColorSchemes.ts
import getColorSchemes from './getColorSchemes';
import {colorSchemeAndMeta} from '@/types';
import {schemes} from '@/utilities/mockColorSchemes';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(schemes),
  })
) as jest.Mock;

test('getColorSchemes', async () => {
  const colorSchemes = await getColorSchemes();
  expect(colorSchemes).toEqual(schemes);
});
