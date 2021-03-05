import React from 'react';

import {validKeys} from 'components/Home/consoleMethods';
import {themeType, textKeyType} from 'types';

export const parseSyntax = (
  theme: themeType,
  markup: string
): (string | JSX.Element)[] => {
  const throwErrors =
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
  return markup.split(/(<[^/>]+?>[^<]+<[^>]+?>)/g).map((string, i) => {
    const matches = [...string.matchAll(/<(.+?)>(.+)<\/(.+)>/g)][0];
    if (matches != null) {
      if (throwErrors && matches[1] !== matches[3]) {
        throw new Error(
          `Opening tag <${matches[1]}> does not match closing tag </${matches[3]}>`
        );
      }
      const colours = matches[1].split(':');
      // check bold in case Windows Terminal ever properly adds bold
      // in the meantime, default to just foreground
      const foreground =
        colours[0] === 'bold' ? 'foreground' : (colours[0] as textKeyType);
      const background =
        colours.length > 0 ? (colours[1] as textKeyType) : null;
      if (
        throwErrors &&
        (!validKeys.includes(foreground) ||
          (background && !validKeys.includes(background)))
      ) {
        throw new Error(
          `Using invalid tags: <${matches[1]}>${matches[2]}</${matches[3]}>`
        );
      }
      const contents = matches[2];
      return (
        <span
          key={i}
          style={{
            color: theme[foreground],
            background: background ? theme[background] : undefined,
          }}
        >
          {contents}
        </span>
      );
    }
    if (throwErrors && string.match(/<(.+?)>(.+)<(.+)>/g)) {
      throw new Error(
        `Found invalid tags: ${string}. \n Are they formatted correctly?`
      );
    }

    return string;
  }, []);
};
