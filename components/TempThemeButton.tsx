'use client';

import {useContext} from 'react';

import {SetCurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';

type Props = {
  name: string;
};

const TempThemeButton = (props: Props) => {
  const setCurrentColorSchemeName = useContext(SetCurrentColorSchemeContext);
  return (
    <button
      onClick={() => {
        setCurrentColorSchemeName(props.name);
      }}
    >
      {props.name}
    </button>
  );
};

export default TempThemeButton;
