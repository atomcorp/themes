import React, {useState, useEffect, useReducer} from 'react';
import contrast from 'get-contrast';
import ResizeObserver from 'resize-observer-polyfill';
import produce from 'immer';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import {
  themeType,
  themeShadeType,
  themeShadeObjectType,
  actionTypes,
} from 'types';
import css from './Home.module.css';
import Header from 'components/Header/Header';

const compare = (a: themeType, b: themeType): number => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const assignColourType = (themes: themeType[]): themeType[] => {
  return themes.map((theme) => {
    theme.isDark = contrast.ratio(theme.background, '#000') < 8;
    return theme;
  });
};

const screenSizeObserver = (
  dispatch: React.Dispatch<actionTypes>
): ResizeObserver => {
  return new ResizeObserver((entries) => {
    const {width} = entries[0].contentRect;
    if (width > 768) {
      dispatch({type: 'SIZE', isSmallScreenSize: false});
    } else if (width < 768) {
      dispatch({type: 'SIZE', isSmallScreenSize: true});
    }
  });
};

const request = async (
  dispatch: React.Dispatch<actionTypes>
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_PATH}/colour-schemes.json`
    );
    const json = await response.json();
    dispatch({
      type: 'LOAD',
      themes: assignColourType(json.sort(compare)),
      activeTheme: json[0].name,
    });
  } catch (err) {
    console.error(err);
  }
};

const THEME_COLOUR: themeShadeObjectType = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  ANY: 'ANY',
};

type stateType = {
  themes: themeType[];
  activeTheme: string;
  isSmallScreenSize: boolean;
  setThemeShade: themeShadeType;
};

const initialState: stateType = {
  themes: [],
  activeTheme: '',
  isSmallScreenSize: window.innerWidth < 768,
  setThemeShade: THEME_COLOUR.ANY,
};

const homeReducer = (state: stateType, action: actionTypes): stateType => {
  return produce(state, (draftState: stateType) => {
    switch (action.type) {
      case 'LOAD':
        draftState.activeTheme = action.activeTheme;
        draftState.themes = action.themes;
        break;
      case 'SET':
        draftState.activeTheme = action.theme;
        break;
      case 'SIZE':
        draftState.isSmallScreenSize = action.isSmallScreenSize;
        break;
      default:
        break;
    }
  });
};

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const [themeShade, setThemeShade] = useState<themeShadeType>(
    THEME_COLOUR.ANY
  );
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
        <div>
          <label htmlFor="all">All</label>
          <input
            type="radio"
            id="all"
            value={THEME_COLOUR.ANY}
            checked={THEME_COLOUR.ANY === themeShade}
            onChange={() => {
              setThemeShade(THEME_COLOUR.ANY);
            }}
          />
          <br />
          <label htmlFor="dark">Dark</label>
          <input
            type="radio"
            id="dark"
            value={THEME_COLOUR.DARK}
            checked={THEME_COLOUR.DARK === themeShade}
            onChange={() => {
              setThemeShade(THEME_COLOUR.DARK);
            }}
          />
          <br />
          <label htmlFor="light">Light</label>
          <input
            type="radio"
            id="light"
            value={THEME_COLOUR.LIGHT}
            checked={THEME_COLOUR.LIGHT === themeShade}
            onChange={() => {
              setThemeShade(THEME_COLOUR.LIGHT);
            }}
          />
        </div>
        {!state.isSmallScreenSize ? (
          <ThemeList
            themeNames={state.themes.map((theme) => theme.name)}
            activeTheme={state.activeTheme}
            dispatch={dispatch}
          />
        ) : (
          <ThemeSelect
            themeNames={state.themes.map((theme) => theme.name)}
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
