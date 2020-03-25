import React, {useEffect, useReducer} from 'react';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Header from 'components/Header/Header';
import ShadeChoice from 'components/ShadeChoice/ShadeChoice';
import themeJson from 'colour-schemes.json';
import css from './Home.module.css';
import {
  homeReducer,
  initialState,
  screenSizeObserver,
  compare,
  THEME_COLOUR,
  assignColourType,
} from './homeMethods';
import {themeType} from 'types';

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(homeReducer, {
    ...initialState,
    ...{isSmallScreenSize: window.innerWidth < 768},
  });
  useEffect(() => {
    const themes = themeJson as themeType[];
    dispatch({
      type: 'LOAD',
      themes: assignColourType(themes.sort(compare)),
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
          <ThemeList
            themeNames={themeNames}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
            primaryColour={state.primaryColour}
            backgroundColour={state.backgroundColour}
          />
        ) : (
          <ThemeSelect
            themeNames={themeNames}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
          />
        )}
      </aside>
      <section className={css.content}>
        <Console
          theme={theme}
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
        />
      </section>
    </section>
  );
};

export default Home;
