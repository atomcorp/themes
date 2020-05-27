import React, {useEffect, useReducer, useRef} from 'react';
import {saveAs} from 'file-saver';

import ThemePreview from 'components/ThemePreview/ThemePreview';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import HomeActions from './HomeActions';
import Toolbar from 'components/Toolbar/Toolbar';
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

const stopSelectDetection = (
  e: KeyboardEvent,
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>
) => {
  if (
    themeselectRef.current != null &&
    document.activeElement === themeselectRef.current
  ) {
    // if the DOM element is being focused, hitting D will
    // select the first <option> starting with D
    e.preventDefault();
    themeselectRef.current.blur();
  }
};

const shortcuts = (
  dispatch: React.Dispatch<any>,
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>
) => (e: KeyboardEvent) => {
  if (e.code === 'KeyA') {
    stopSelectDetection(e, themeselectRef);
    dispatch({
      type: 'PREV',
    });
  }
  if (e.code === 'KeyD') {
    stopSelectDetection(e, themeselectRef);
    dispatch({
      type: 'NEXT',
    });
  }
};

const Home: React.FC<themeprops> = (props) => {
  const themeselectRef = useRef(null);
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
    const shortcutFns = shortcuts(dispatch, themeselectRef);
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
    <section
      className={css.container}
      style={{background: state.backgroundColour}}
    >
      <Toolbar
        themeShade={state.themeShade}
        previewType={state.previewType}
        dispatch={dispatch}
        activeTheme={state.activeTheme}
        themeNames={themeNames}
        themeselectRef={themeselectRef}
      />
      <section className={css.content}>
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
