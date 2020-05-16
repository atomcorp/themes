import React from 'react';

import css from './Home.module.css';
import {
  themeType,
  themeShadeType,
  themeShadeObjectType,
  actionTypes,
  previewType,
} from 'types';
import {Light, Dark, Console, Colours, Github, Download} from 'Icons';
import Toggle from 'components/Toggle/Toggle';

type PropsType = {
  primaryColour: string;
  backgroundColour: string;
  previewType: previewType;
  dispatch: React.Dispatch<actionTypes>;
  themeShade: themeShadeType;
  downloadAllThemes: () => void;
};

const HomeActions = (props: PropsType) => (
  <div className={css.footer} style={{color: props.primaryColour}}>
    <Toggle
      primaryColour={props.primaryColour}
      backgroundColour={props.backgroundColour}
      currentValue={props.previewType}
      dispatch={props.dispatch}
      type="PREVIEW"
      values={[
        {
          value: 'console',
          label: 'Console',
          icon: (isSelected: boolean) => (
            <Console
              size="36px"
              colour={isSelected ? props.backgroundColour : props.primaryColour}
            />
          ),
        },
        {
          value: 'colour',
          label: 'Colour',
          icon: (isSelected: boolean) => (
            <Colours
              size="36px"
              colour={isSelected ? props.backgroundColour : props.primaryColour}
            />
          ),
        },
      ]}
    />
    <Toggle
      primaryColour={props.primaryColour}
      backgroundColour={props.backgroundColour}
      currentValue={props.themeShade}
      dispatch={props.dispatch}
      type="SHADE"
      values={[
        {
          value: 'DARK',
          label: 'Dark',
          icon: (isSelected: boolean) => (
            <Dark
              size="36px"
              colour={isSelected ? props.backgroundColour : props.primaryColour}
            />
          ),
        },
        {
          value: 'LIGHT',
          label: 'Light',
          icon: (isSelected: boolean) => (
            <Light
              size="36px"
              colour={isSelected ? props.backgroundColour : props.primaryColour}
            />
          ),
        },
      ]}
    />
    <a
      className={css.git}
      href="https://github.com/atomcorp/themes"
      style={{color: props.primaryColour}}
    >
      <Github size="36px" colour={props.primaryColour} />
    </a>
    <button
      style={{color: props.primaryColour}}
      className={css.download}
      onClick={props.downloadAllThemes}
    >
      <Download size="36px" colour={props.primaryColour} />
    </button>
  </div>
);

export default HomeActions;
