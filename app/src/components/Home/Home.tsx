import React, {useEffect, useReducer, useRef, useMemo} from 'react';
import {saveAs} from 'file-saver';

import ThemePreview from 'components/ThemePreview/ThemePreview';
import Toolbar from 'components/Toolbar/Toolbar';
import MoreContent from 'components/More/MoreContent';

import css from './Home.module.css';
import {
  homeReducer,
  initialState,
  screenSizeObserver,
  returnInitialTheme,
} from './homeMethods';
import {themeType, actionTypes} from 'types';

type themeprops = {
  themes: themeType[];
};

const stopSelectDetection = (
  e: KeyboardEvent,
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>
): void => {
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
  dispatch: React.Dispatch<actionTypes>,
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

const sampleColours = (theme: themeType | undefined): string[] => {
  if (theme) {
    return [
      theme.red,
      theme.green,
      theme.yellow,
      theme.blue,
      theme.purple,
      theme.cyan,
    ]
      .sort(() => Math.random() - 0.5)
      .slice(3);
  }
  return [];
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
  const downloadAllThemes = (): void => {
    const themeBlob = new Blob(
      [
        JSON.stringify(
          props.themes.map((theme) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const stringyTheme = theme != null ? JSON.stringify(theme) : null;
  const colours = useMemo(() => {
    // idk, this seems dumb but Dan says it's fine
    // https://twitter.com/dan_abramov/status/1104414469629898754?lang=en
    return sampleColours(
      stringyTheme != null ? JSON.parse(stringyTheme) : null
    );
  }, [stringyTheme]);
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
        colours={colours}
        isMoreOpen={state.isMoreOpen}
        isSmallScreenSize={state.isSmallScreenSize}
      />
      <section className={css.content}>
        <MoreContent
          downloadAllThemes={downloadAllThemes}
          isMoreOpen={state.isMoreOpen}
          dispatch={dispatch}
        />
        <ThemePreview
          dispatch={dispatch}
          themeShade={state.themeShade}
          previewType={state.previewType}
          theme={theme}
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
          isSmallScreenSize={state.isSmallScreenSize}
          activeTheme={state.activeTheme}
          themeNames={themeNames}
          themeselectRef={themeselectRef}
        />
      </section>
    </section>
  );
};

export default Home;
