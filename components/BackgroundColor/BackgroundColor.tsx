'use client';
import {ReactNode} from 'react';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';

type Props = {
  children: ReactNode;
};

const BackgroundColor = (props: Props) => {
  const {
    colorSchemeState: {
      activeColorScheme: {background},
    },
  } = useColorSchemes();
  return (
    <div
      style={{
        backgroundColor: background,
      }}
    >
      {props.children}
    </div>
  );
};

export default BackgroundColor;
