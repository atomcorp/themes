import React, {useEffect, useReducer, useRef, useCallback} from 'react';

import ColourTest from 'components/ColourTest/ColourTest';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Header from 'components/Header/Header';
import ShadeChoice from 'components/ShadeChoice/ShadeChoice';
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

const Home: React.FC<themeprops> = (props) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const [state, dispatch] = useReducer(homeReducer, {
    ...initialState,
    ...{isSmallScreenSize: window.innerWidth < 768},
  });
  const initialTheme = returnInitialTheme(window.location.search);
  const scrollToLabel = useCallback((): void => {
    // scroll to the initialTheme, if used

    if (
      initialTheme != null &&
      window.innerWidth >= 768 &&
      sidebarRef.current != null
    ) {
      const labelEl = sidebarRef.current.querySelector(
        `[for="${initialTheme}"]`
      );
      if (labelEl != null) {
        const labelElDimensions = labelEl.getBoundingClientRect();
        const sidebarViewHeight = sidebarRef.current.offsetHeight;
        const sidebarScrollHeight = sidebarRef.current.scrollHeight;
        sidebarRef.current.scrollTop =
          labelElDimensions.top > sidebarScrollHeight - sidebarViewHeight
            ? labelElDimensions.top
            : labelElDimensions.top - sidebarViewHeight / 2;
      }
    }
  }, []);
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
  }, []);
  const theme = state.themes.find((theme) => theme.name === state.activeTheme);
  const themeNames = state.filteredThemes.map((theme) => theme.name);
  return (
    <section className={css.container}>
      <aside
        ref={sidebarRef}
        style={{
          background: state.backgroundColour,
        }}
        className={`${css.sidebar} ${
          state.themeShade === THEME_COLOUR.DARK ? css.dark : css.light
        }`}
      >
        <Header primaryColour={state.primaryColour} />
        <ShadeChoice dispatch={dispatch} themeShade={state.themeShade} />
        {!state.isSmallScreenSize ? (
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
              scrollToLabel={scrollToLabel}
            />
          )
        ) : (
          <ThemeSelect
            themeNames={themeNames}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
          />
        )}
      </aside>
      <section className={css.content}>
        <ColourTest
          theme={theme}
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
        />
      </section>
    </section>
  );
};

export default Home;
