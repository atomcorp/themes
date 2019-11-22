import contrast from 'get-contrast';
import ResizeObserver from 'resize-observer-polyfill';
import produce from 'immer';

import {
  themeType,
  themeShadeType,
  themeShadeObjectType,
  actionTypes,
} from 'types';

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

export const screenSizeObserver = (
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

export const request = async (
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

export const THEME_COLOUR: themeShadeObjectType = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  ANY: 'ANY',
};

type stateType = {
  themes: themeType[];
  activeTheme: string;
  isSmallScreenSize: boolean;
  themeShade: themeShadeType;
};

export const initialState: stateType = {
  themes: [],
  activeTheme: '',
  isSmallScreenSize: window.innerWidth < 768,
  themeShade: THEME_COLOUR.ANY,
};

export const homeReducer = (
  state: stateType,
  action: actionTypes
): stateType => {
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
      case 'SHADE':
        draftState.themeShade = action.themeShade;
        break;
      default:
        break;
    }
  });
};
