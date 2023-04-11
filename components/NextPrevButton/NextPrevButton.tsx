// react component, next or prev color scheme button
'use client';

import {SetNextPrevColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {colorSchemeAndMeta} from '@/types';
import useDefinedContext from '@/utilities/useDefinedContext';

type NextPrevButtonProps = {
  direction: 'next' | 'prev';
  colorSchemes: colorSchemeAndMeta[];
};

const NextPrevButton = (props: NextPrevButtonProps) => {
  const setNextPrevColorScheme = useDefinedContext(
    SetNextPrevColorSchemeContext
  );

  return (
    <button
      onClick={() => {
        setNextPrevColorScheme(props.direction);
      }}
    >
      {props.direction === 'next' ? 'Next' : 'Prev'}
    </button>
  );
};

export default NextPrevButton;
