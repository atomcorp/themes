import React from 'react';

import css from './ThemePreview.module.css';
import {Share, Copy} from 'Icons';

type ThemePreviewButtonType = {
  onClick: () => void;
  colour: string;
};

const ThemePreviewButton: React.FC<ThemePreviewButtonType> = (props) => {
  return (
    <button
      style={{
        color: props.colour,
      }}
      className={css.button}
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
  primaryColour: string;
};

const ThemePreviewButtons = (props: ThemePreviewButtonsType) => (
  <>
    <ThemePreviewButton onClick={props.handleCopy} colour={props.primaryColour}>
      Copy
      <Copy className={css.icon} colour={props.primaryColour} />
    </ThemePreviewButton>
    <ThemePreviewButton
      onClick={props.handleShare}
      colour={props.primaryColour}
    >
      Share
      <Share className={css.icon} colour={props.primaryColour} />
    </ThemePreviewButton>
  </>
);

export default ThemePreviewButtons;
