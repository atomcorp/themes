// react component, next or prev color scheme button
'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';

type NextPrevButtonProps = {
  direction: 'next' | 'prev';
};

const NextPrevButton = (props: NextPrevButtonProps) => {
  const {setNextPrevColorScheme} = useColorSchemes();

  return (
    <button
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
