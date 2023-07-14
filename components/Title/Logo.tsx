'use client';

import {CSSProperties} from 'react';

import styles from './Logo.module.css';
import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import getRandomColors from '@/utilities/getRandomColors';

interface StyleProps extends CSSProperties {
  '--color-one'?: string;
  '--color-two'?: string;
  '--color-three'?: string;
  '--color-four'?: string;
  '--color-five'?: string;
}

const Logo = () => {
  const {colorSchemeState} = useColorSchemes();
  const randomColors = getRandomColors(colorSchemeState.currentColorScheme);

  return (
    <span
      style={
        {
          '--color-one': randomColors[0],
          '--color-two': randomColors[1],
          '--color-three': randomColors[2],
          '--color-four': randomColors[3],
          '--color-five': randomColors[4],
        } as StyleProps
      }
      className={styles.container}
    >
      {'>_'}
    </span>
  );
};

export default Logo;
