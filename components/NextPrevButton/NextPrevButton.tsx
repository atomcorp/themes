// react component, next or prev color scheme button
'use client';

import {useContext} from 'react';

import {SetNextPrevColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';

type NextPrevButtonProps = {
  direction: 'next' | 'prev';
  colorSchemes: colorSchemeAndMeta[];
};

const NextPrevButton = (props: NextPrevButtonProps) => {
  const setNextPrevColorScheme = useContext(SetNextPrevColorSchemeContext);

  return (
    <button onClick={() => setNextPrevColorScheme(props.direction)}>
      {props.direction === 'next' ? 'Next' : 'Prev'}
    </button>
  );
};

export default NextPrevButton;
