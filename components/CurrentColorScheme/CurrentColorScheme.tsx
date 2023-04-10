// display all the properties of the current color scheme, with a box next to the colours with that colour
// Compare this snippet from components/ColorSchemeSelector/ColorSchemeSelector.tsx:
// // react component, displays all the color schemes
'use client';

import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';
import useDefinedContext from '@/utilities/useDefinedContext';

const getColorsOnlyFromSchemeAndMeta = (colorScheme: colorSchemeAndMeta) => {
  const {name, meta, ...colorSchemeColors} = colorScheme;
  return colorSchemeColors;
};

const CurrentColorScheme = () => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const currentColors = getColorsOnlyFromSchemeAndMeta(currentColorScheme);

  return (
    <div>
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {currentColorScheme.name}
      </h2>
      <ul>
        {Object.entries(currentColors).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
            <div
              style={{
                width: '100px',
                height: '1rem',
                backgroundColor: value,
                display: 'inline-block',
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentColorScheme;
