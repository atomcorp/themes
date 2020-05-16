import React, {useState, useReducer} from 'react';
import * as clipboard from 'clipboard-polyfill';
import immer from 'immer';

import ColourTest from 'components/ColourTest/ColourTest';
import ConsoleTest from 'components/ConsoleTest/ConsoleTest';
import {themeType, previewType} from 'types';
import css from './ThemePreview.module.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {parseValidKeys} from './consoleMethods';
import {Share, Copy} from 'Icons';
import Toast from 'components/Toast/Toast';

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

type reducerType = {
  title: string;
  isActive: boolean;
  message: string;
};

type actionType =
  | {
      type: 'show';
      title: string;
      message: string;
    }
  | {
      type: 'hide';
    };

const toastmessages = {
  share: (themename: string) =>
    `Added a direct link to the ${themename} theme to your clipboard`,
  copy: (themename: string) =>
    `Copied the scheme for the ${themename} to your clipboard`,
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

const initialState = {
  isActive: false,
  title: 'Title',
  message: 'A message to be written here for me',
};

const reducer = (state: reducerType, action: actionType) => {
  return immer(state, (draftState: reducerType) => {
    switch (action.type) {
      case 'show':
        draftState.title = action.title;
        draftState.message = action.message;
        draftState.isActive = true;
        break;
      case 'hide':
        draftState.isActive = false;
    }
  });
};

const ThemePreview: React.FC<PropsType> = (props) => {
  // const [toast, setToast] = useState({isActive: false, title: '', message: ''});
  const [state, dispatch] = useReducer(reducer, initialState);
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
    if (!state.isActive && props.theme) {
      dispatch({
        type: 'show',
        title: 'Copied!',
        message: toastmessages.copy(props.theme.name),
      });
      clipboard.writeText(JSON.stringify(parseValidKeys(props.theme), null, 2));
      setTimeout(() => {
        dispatch({type: 'hide'});
      }, 2000);
    }
  };
  const handleShare = () => {
    if (!state.isActive && props.theme) {
      dispatch({
        type: 'show',
        title: 'Shared!',
        message: toastmessages.share(props.theme.name),
      });
      clipboard.writeText(
        `${window.location.origin}${
          window.location.pathname
        }?theme=${encodeURIComponent(props.theme.name)}`
      );
      setTimeout(() => {
        dispatch({type: 'hide'});
      }, 2000);
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
      <Toast
        color={props.primaryColour}
        background={props.backgroundColour}
        title={state.title}
        isActive={state.isActive}
        message={state.message}
      />
    </section>
  );
};

export default ThemePreview;
