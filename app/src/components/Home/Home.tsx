import React, {useEffect, useReducer, useRef, useMemo} from 'react';

import ThemePreview from 'components/ThemePreview/ThemePreview';
import Toolbar from 'components/Toolbar/Toolbar';

import css from './Home.module.css';
import {
  screenSizeObserver,
  returnInitialTheme,
  shortcuts,
  sampleColours,
} from './homeMethods';
import {homeReducer, initialState} from 'components/Home/homeState';
import {themeType} from 'types';

type themeprops = {
  themes: themeType[];
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
        isSmallScreenSize={state.isSmallScreenSize}
      />
      <section className={css.content}>
        <ThemePreview
          dispatch={dispatch}
          themeShade={state.themeShade}
          previewType={state.previewType}
          theme={theme}
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
