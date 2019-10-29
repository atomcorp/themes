import contrast from 'get-contrast';

import {backgroundKeyType, textKeyType, themeType} from 'types';

export const backgroundKeys: backgroundKeyType[] = [
  'background',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
  'background',
];

export const textKeys: textKeyType[] = [
  'black',
  'brightBlack',
  'red',
  'brightRed',
  'green',
  'brightGreen',
  'yellow',
  'brightYellow',
  'blue',
  'brightBlue',
  'purple',
  'brightPurple',
  'cyan',
  'brightCyan',
  'white',
  'brightWhite',
];

export type titleColoursType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white';

export const titleColours: titleColoursType[] = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
];

export const getRandomColour = (theme: themeType | undefined): string => {
  if (theme == null) {
    return '';
  }
  const randomisedColours = titleColours.sort(() => Math.random() - 0.5);
  const accessibleColour = randomisedColours.find(
    (titleColour: titleColoursType) =>
      contrast.isAccessible(theme[titleColour], theme.background)
  );
  if (accessibleColour != null) {
    return theme[accessibleColour];
  }
  return theme[titleColours[0]];
};
