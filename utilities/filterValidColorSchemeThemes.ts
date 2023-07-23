import {colorScheme, colorSchemeAndMeta} from '@/types';

export const parseValidKeys = (
  colorScheme: colorSchemeAndMeta
): colorScheme => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {meta, ...validKeys} = colorScheme;

  return validKeys;
};
