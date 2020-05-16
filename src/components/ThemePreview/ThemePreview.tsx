import React, {useState} from 'react';
import * as clipboard from 'clipboard-polyfill';

import ColourTest from 'components/ColourTest/ColourTest';
import ConsoleTest from 'components/ConsoleTest/ConsoleTest';
import {themeType, previewType} from 'types';
import css from './ThemePreview.module.css';
import {parseValidKeys} from './consoleMethods';
import {Share, Copy} from 'Icons';

type PropsType = {
  theme?: themeType;
  primaryColour: string;
  backgroundColour: string;
  previewType: previewType;
};

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

const ThemePreview: React.FC<PropsType> = (props) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  if (!props.theme) {
    return (
      <div
        style={{background: props.backgroundColour, color: props.primaryColour}}
        className={css.loading}
      >
        Loading...
      </div>
    );
  }
  const handleCopy = () => {
    if (!copied && props.theme) {
      setCopied(true);
      clipboard.writeText(JSON.stringify(parseValidKeys(props.theme), null, 2));
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  };
  const handleShare = () => {
    if (!shared) {
      setShared(true);
      setTimeout(() => {
        if (props.theme != null) {
          clipboard.writeText(
            `${window.location.origin}${
              window.location.pathname
            }?theme=${encodeURIComponent(props.theme.name)}`
          );
        }
        setShared(false);
      }, 500);
    }
  };
  return (
    <section
      className={css.container}
      style={{background: props.backgroundColour}}
    >
      <div className={css.heading}>
        <h2
          data-testid="selected-title"
          className={css.name}
          style={{color: props.primaryColour}}
        >
          {props.theme.name}
        </h2>
        <ThemePreviewButton onClick={handleCopy} colour={props.primaryColour}>
          Copy
          <Copy className={css.icon} colour={props.primaryColour} />
        </ThemePreviewButton>
        <ThemePreviewButton onClick={handleShare} colour={props.primaryColour}>
          Share
          <Share className={css.icon} colour={props.primaryColour} />
        </ThemePreviewButton>
      </div>
      {props.previewType === 'colour' ? (
        <ColourTest theme={props.theme} />
      ) : (
        <ConsoleTest theme={props.theme} />
      )}
    </section>
  );
};

export default ThemePreview;
