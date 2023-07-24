'use client';

import {CSSProperties} from 'react';

import styles from './Logo.module.css';
import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import useRandomColors from '@/utilities/useRandomServerColors';

interface StyleProps extends CSSProperties {
  '--color-one': string;
  '--color-two': string;
  '--color-three': string;
  '--color-four': string;
  '--color-five': string;
}

const Logo = () => {
  const {
    colorSchemeState: {activeColorScheme},
  } = useColorSchemes();
  const colors = useRandomColors(activeColorScheme);

  return (
    <div
      aria-hidden="true"
      style={
        {
          '--color-one': colors[0],
          '--color-two': colors[1],
          '--color-three': colors[2],
          '--color-four': colors[3],
          '--color-five': colors[4],
        } as StyleProps
      }
      className={styles.border}
    >
      <div className={styles.background}>
        <div className={styles.text}>{'>_'}</div>
      </div>{' '}
    </div>
  );
};

export default Logo;
