// react component, next or prev color scheme button
'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';

import css from './NextPrevButton.module.css';

type NextPrevButtonProps = {
  direction: 'next' | 'prev';
};

const NextPrevButton = (props: NextPrevButtonProps) => {
  const {setNextPrevColorScheme} = useColorSchemes();

  return (
    <button
      className={`${css.button} ${css[props.direction]}`}
      onClick={() => {
        setNextPrevColorScheme(props.direction);
      }}
      tabIndex={-1}
    >
      {props.direction === 'next' ? 'Next' : 'Prev'}
    </button>
  );
};

export default NextPrevButton;
