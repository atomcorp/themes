import React, {useReducer} from 'react';
import * as clipboard from 'clipboard-polyfill';
import immer from 'immer';

import ColourTest from 'components/ColourTest/ColourTest';
import ConsoleTest from 'components/ConsoleTest/ConsoleTest';
import {themeType, previewType} from 'types';
import css from './ThemePreview.module.css';
import {parseValidKeys} from './consoleMethods';
import Toast from 'components/Toast/Toast';
import ThemePreviewButtons from './ThemePreviewButtons';
import Toggles from 'components/Toggle/Toggles';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';

import {actionTypes, themeShadeType} from 'types';

type PropsType = {
  theme?: themeType;
  primaryColour: string;
  backgroundColour: string;
  previewType: previewType;
  isSmallScreenSize: boolean;
  themeShade: themeShadeType;
  dispatch: React.Dispatch<actionTypes>;
  themeNames: string[];
  activeTheme: string;
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>;
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
  share: (themename: string) => `${themename} link added your clipboard`,
  copy: (themename: string) => `${themename} theme added to your clipboard`,
};

const initialState = {
  isActive: false,
  title: 'Title',
  message: 'A message to be written here for me',
};

const reducer = (state: reducerType, action: actionType): reducerType => {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  if (!props.theme) {
    return (
      <div
        style={{background: props.backgroundColour, color: props.primaryColour}}
        className={css.loading}
      ></div>
    );
  }
  const handleCopy = (): void => {
    if (!state.isActive && props.theme) {
      dispatch({
        type: 'show',
        title: 'Copied!',
        message: toastmessages.copy(props.theme.name),
      });
      clipboard.writeText(JSON.stringify(parseValidKeys(props.theme), null, 2));
      setTimeout(() => {
        dispatch({type: 'hide'});
      }, 1000);
    }
  };
  const handleShare = (): void => {
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
      }, 1000);
    }
  };
  return (
    <section className={css.container}>
      {props.isSmallScreenSize && (
        <div className={css.toggles}>
          <Toggles
            themeShade={props.themeShade}
            previewType={props.previewType}
            dispatch={props.dispatch}
          />
        </div>
      )}
      {props.previewType === 'colour' ? (
        <ColourTest theme={props.theme} />
      ) : (
        <ConsoleTest theme={props.theme} />
      )}
      {props.isSmallScreenSize && (
        <div className={css.select}>
          <ThemeSelect
            themeNames={props.themeNames}
            dispatch={props.dispatch}
            activeTheme={props.activeTheme}
            themeselectRef={props.themeselectRef}
          />
        </div>
      )}
      <ThemePreviewButtons
        themename={props.theme.name}
        handleCopy={handleCopy}
        handleShare={handleShare}
      />
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
