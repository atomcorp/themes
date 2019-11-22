import React, {useEffect, useReducer} from 'react';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Header from 'components/Header/Header';
import ShadeChoice from 'components/ShadeChoice/ShadeChoice';
import css from './Home.module.css';
import {
  homeReducer,
  initialState,
  screenSizeObserver,
  request,
} from './homeMethods';

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  useEffect(() => {
    request(dispatch);
    const resizer = screenSizeObserver(dispatch);
    resizer.observe(document.body);
    return () => {
      resizer.unobserve(document.body);
    };
  }, []);
  const theme = state.themes.find((theme) => theme.name === state.activeTheme);
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <Header />
        <ShadeChoice dispatch={dispatch} themeShade={state.themeShade} />
        {!state.isSmallScreenSize ? (
          <ThemeList
            themeNames={state.filteredThemes.map((theme) => theme.name)}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
          />
        ) : (
          <ThemeSelect
            themeNames={state.filteredThemes.map((theme) => theme.name)}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
          />
        )}
      </aside>
      <section className={css.content}>
        <Console theme={theme} />
      </section>
    </section>
  );
};

export default Home;
