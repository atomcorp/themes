import React from 'react';

import Toggle from 'components/Toggle/Toggle';
import {Console, Colours, Dark, Light} from 'Icons';
import {previewType, actionTypes, themeShadeType} from 'types';

// TODO: shadeValues & previewValues is really ugly
const shadeValues = [
  {
    value: 'DARK',
    label: 'Dark',
    // eslint-disable-next-line react/display-name
    icon: () => (
      <Dark
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'LIGHT',
    label: 'Light',
    // eslint-disable-next-line react/display-name
    icon: () => (
      <Light
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

const previewValues = [
  {
    value: 'console',
    label: 'Terminal',
    // eslint-disable-next-line react/display-name
    icon: () => (
      <Console
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'colour',
    label: 'Colours',
    // eslint-disable-next-line react/display-name
    icon: () => (
      <Colours
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

type PropsType = {
  themeShade: themeShadeType;
  previewType: previewType;
  dispatch: React.Dispatch<actionTypes>;
};

const Toggles = (props: PropsType): JSX.Element => (
  <>
    <Toggle
      currentValue={props.themeShade}
      dispatch={props.dispatch}
      type="SHADE"
      values={shadeValues}
    />
    <Toggle
      currentValue={props.previewType}
      dispatch={props.dispatch}
      type="PREVIEW"
      values={previewValues}
    />
  </>
);

export default Toggles;
