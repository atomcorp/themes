import React, {useEffect, useReducer, useRef, useMemo} from 'react';
import * as clipboard from 'clipboard-polyfill';

import {
  screenSizeObserver,
  returnInitialTheme,
  shortcuts,
  sampleColours,
} from './homeMethods';
import {homeReducer, initialState} from 'components/Home/homeState';
import {themeType} from 'types';
import {Copy, Logo, Share} from 'Icons';
import Toggles from 'components/Toggle/Toggles';
import ColourTest from 'components/ColourTest/ColourTest';
import ConsoleTest from 'components/ConsoleTest/ConsoleTest';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Toast from 'components/Toast/Toast';
import {parseValidKeys} from './consoleMethods';

import css from './Home.module.css';
import toolbar from './toolbar.module.css';
import content from './content.module.css';

type themeprops = {
  themes: themeType[];
};

const toastmessages = {
  share: (themename: string) => `${themename} link added your clipboard`,
  copy: (themename: string) => `${themename} theme added to your clipboard`,
};

const Home: React.FC<themeprops> = (props) => {
  const themeselectRef = useRef(null);
  const [state, dispatch] = useReducer(homeReducer, {
    ...initialState,
    ...{isSmallScreenSize: window.innerWidth < 1024},
  });
  useEffect(() => {
    dispatch({
      type: 'LOAD',
      themes: props.themes,
      initialTheme: returnInitialTheme(window.location.search),
    });
    const resizer = screenSizeObserver(dispatch);
    resizer.observe(document.body);
    return () => {
      resizer.unobserve(document.body);
    };
  }, [props.themes]);
  useEffect(() => {
    const shortcutFns = shortcuts(dispatch, themeselectRef);
    document.addEventListener('keypress', shortcutFns);
    return () => {
      document.removeEventListener('keypress', shortcutFns);
    };
  }, []);
  const theme = state.themes.find((theme) => theme.name === state.activeTheme);
  const themeNames = state.filteredThemes.map((theme) => theme.name);

  const stringyTheme = theme != null ? JSON.stringify(theme) : null;
  const colours = useMemo(() => {
    // idk, this seems dumb but Dan says it's fine
    // https://twitter.com/dan_abramov/status/1104414469629898754?lang=en
    return sampleColours(
      stringyTheme != null ? JSON.parse(stringyTheme) : null
    );
  }, [stringyTheme]);
  const handleCopy = (): void => {
    if (!state.message.isActive && theme) {
      dispatch({
        type: 'show',
        title: 'Copied!',
        message: toastmessages.copy(theme.name),
      });
      clipboard.writeText(JSON.stringify(parseValidKeys(theme), null, 2));
      setTimeout(() => {
        dispatch({type: 'hide'});
      }, 1000);
    }
  };
  const handleShare = (): void => {
    if (!state.message.isActive && theme) {
      dispatch({
        type: 'show',
        title: 'Shared!',
        message: toastmessages.share(theme.name),
      });
      clipboard.writeText(
        `${window.location.origin}${
          window.location.pathname
        }?theme=${encodeURIComponent(theme.name)}`
      );
      setTimeout(() => {
        dispatch({type: 'hide'});
      }, 1000);
    }
  };
  return (
    <section
      className={css.container}
      style={{background: state.backgroundColour}}
    >
      <section className={toolbar.container}>
        <a href="/" className={toolbar.title}>
          <Logo size="48px" colours={colours} className={toolbar.logo} />
          <h1>Windows Terminal Themes</h1>
        </a>
        {!state.isSmallScreenSize && (
          <div className={toolbar.toggles}>
            <Toggles
              themeShade={state.themeShade}
              previewType={state.previewType}
              dispatch={dispatch}
            />
          </div>
        )}
      </section>

      <section className={css.content}>
        <section className={content.container}>
          {state.isSmallScreenSize && (
            <div className={content.toggles}>
              <Toggles
                themeShade={state.themeShade}
                previewType={state.previewType}
                dispatch={dispatch}
              />
            </div>
          )}
          {theme != null &&
            (state.previewType === 'colour' ? (
              <ColourTest theme={theme} />
            ) : (
              <ConsoleTest theme={theme} />
            ))}
          <ThemeSelect
            themeNames={themeNames}
            dispatch={dispatch}
            activeTheme={state.activeTheme}
            themeselectRef={themeselectRef}
          />
          <div className={content.buttons}>
            <button
              data-testid="copyButton"
              className={`${content.button} ${content.primary}`}
              onClick={handleCopy}
            >
              <Copy className={content.icon} colour="#ededed" />
              Get theme
            </button>
            <button
              data-testid="shareButton"
              className={content.button}
              onClick={handleShare}
            >
              <Share
                className={content.icon}
                colour={getComputedStyle(
                  document.documentElement
                ).getPropertyValue('--btn__colour')}
              />
              Share theme
            </button>
          </div>
          <Toast
            background={props.backgroundColour}
            title={state.message.title}
            isActive={state.message.isActive}
            message={state.message.message}
          />
        </section>
      </section>
    </section>
  );
};

export default Home;
