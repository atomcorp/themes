import React from 'react';

import css from './ThemePreview.module.css';
import {Share, Copy} from 'Icons';

type ThemePreviewButtonType = {
  onClick: () => void;
  type?: string;
  testid: string;
};

const ThemePreviewButton: React.FC<ThemePreviewButtonType> = (props) => {
  return (
    <button
      data-testid={props.testid}
      className={`${css.button} ${props.type === 'primary' ? css.primary : ''}`}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
};

type ThemePreviewButtonsType = {
  handleCopy: () => void;
  handleShare: () => void;
  themename: string;
};

const ThemePreviewButtons = (props: ThemePreviewButtonsType): JSX.Element => (
  <div className={css.buttons}>
    <ThemePreviewButton
      testid="copyButton"
      type="primary"
      onClick={props.handleCopy}
    >
      <Copy className={css.icon} colour="#ededed" />
      Get theme
    </ThemePreviewButton>
    <ThemePreviewButton testid="shareButton" onClick={props.handleShare}>
      <Share
        className={css.icon}
        colour={getComputedStyle(document.documentElement).getPropertyValue(
          '--btn__colour'
        )}
      />
      Share theme
    </ThemePreviewButton>
  </div>
);

export default ThemePreviewButtons;
