import React, {useEffect, useReducer} from 'react';
import {saveAs} from 'file-saver';

import ThemePreview from 'components/ThemePreview/ThemePreview';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import HomeActions from './HomeActions';
import css from './Home.module.css';
import {
  homeReducer,
  initialState,
  screenSizeObserver,
  THEME_COLOUR,
  returnInitialTheme,
} from './homeMethods';
import {themeType} from 'types';

type themeprops = {
  themes: themeType[];
};

const shortcuts = (dispatch: React.Dispatch<any>) => (e: KeyboardEvent) => {
  if (e.code === 'KeyA') {
    dispatch({
      type: 'PREV',
    });
  }
  if (e.code === 'KeyD') {
    dispatch({
      type: 'NEXT',
    });
  }
};

const Home: React.FC<themeprops> = (props) => {
  const [state, dispatch] = useReducer(homeReducer, {
    ...initialState,
    ...{isSmallScreenSize: window.innerWidth < 1024},
  });
  const initialTheme = returnInitialTheme(window.location.search);
  useEffect(() => {
    dispatch({
      type: 'LOAD',
      themes: props.themes,
      initialTheme: initialTheme,
    });
    const resizer = screenSizeObserver(dispatch);
    resizer.observe(document.body);
    return () => {
      resizer.unobserve(document.body);
    };
  }, [props.themes, initialTheme]);
  useEffect(() => {
    const shortcutFns = shortcuts(dispatch);
    document.addEventListener('keypress', shortcutFns);
    return () => {
      document.removeEventListener('keypress', shortcutFns);
    };
  }, []);
  const theme = state.themes.find((theme) => theme.name === state.activeTheme);
  const themeNames = state.filteredThemes.map((theme) => theme.name);
  const downloadAllThemes = () => {
    const themeBlob = new Blob(
      [
        JSON.stringify(
          props.themes.map((theme) => {
            const {isDark, ...rest} = theme;
            return rest;
          }),
          null,
          2
        ),
      ],
      {
        type: 'application/json',
      }
    );
    saveAs(themeBlob, 'windows-terminal-themes.json', {autoBom: true});
  };
  return (
    <section className={css.container}>
      <aside
        style={{
          background: state.backgroundColour,
          borderColor: state.primaryColour,
        }}
        className={`${css.sidebar} ${
          state.themeShade === THEME_COLOUR.DARK ? css.dark : css.light
        }`}
      >
        <a
          href="/themes"
          style={{color: state.primaryColour}}
          className={css.title}
        >
          <h1>Windows Terminal Themes</h1>
        </a>
        {!state.isSmallScreenSize &&
          /**
           * this length check is just to make sure when the ThemeList loads it will have themes
           * it needs to do this to make the scrollToLabel function work when the component loads
           */
          themeNames.length > 0 && (
            <ThemeList
              themeNames={themeNames}
              activeTheme={state.activeTheme}
              dispatch={dispatch}
              primaryColour={state.primaryColour}
              backgroundColour={state.backgroundColour}
            />
          )}
        <HomeActions
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
          previewType={state.previewType}
          dispatch={dispatch}
          themeShade={state.themeShade}
          downloadAllThemes={downloadAllThemes}
        />
        {state.isSmallScreenSize && (
          <ThemeSelect
            themeNames={themeNames}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
            primaryColour={state.primaryColour}
          />
        )}
      </aside>
      <section
        className={css.content}
        style={{color: state.primaryColour, background: state.backgroundColour}}
      >
        <ThemePreview
          previewType={state.previewType}
          theme={theme}
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
          isSmallScreenSize={state.isSmallScreenSize}
        />
      </section>
    </section>
  );
};

export default Home;
