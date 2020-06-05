import React, {useEffect, useReducer, useRef, useMemo} from 'react';
import {saveAs} from 'file-saver';

import ThemePreview from 'components/ThemePreview/ThemePreview';
import Toolbar from 'components/Toolbar/Toolbar';
import MoreContent from 'components/More/MoreContent';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Toggle from 'components/Toggle/Toggle';

import css from './Home.module.css';
import {
  homeReducer,
  initialState,
  screenSizeObserver,
  returnInitialTheme,
} from './homeMethods';
import {themeType} from 'types';
import {Console, Colours, Dark, Light} from 'Icons';

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

const sampleColours = (theme: themeType | undefined) => {
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

const shadeValues = [
  {
    value: 'DARK',
    label: 'Dark',
    icon: () => (
      <Dark
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'LIGHT',
    label: 'Light',
    icon: () => (
      <Light
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

const previewValues = [
  {
    value: 'console',
    label: 'Terminal',
    icon: () => (
      <Console
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'colour',
    label: 'Colours',
    icon: () => (
      <Colours
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

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

  const ThemeSelectContainer = () => (
    <ThemeSelect
      themeNames={themeNames}
      dispatch={dispatch}
      activeTheme={state.activeTheme}
      themeselectRef={themeselectRef}
    />
  );
  const Toggles = () => (
    <>
      <Toggle
        currentValue={state.themeShade}
        dispatch={dispatch}
        type="SHADE"
        values={shadeValues}
      />
      <Toggle
        currentValue={state.previewType}
        dispatch={dispatch}
        type="PREVIEW"
        values={previewValues}
      />
    </>
  );
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
        ThemeSelectContainer={ThemeSelectContainer}
        Toggles={Toggles}
      />
      <section className={css.content}>
        <MoreContent
          downloadAllThemes={downloadAllThemes}
          isMoreOpen={state.isMoreOpen}
          dispatch={dispatch}
        />
        <ThemePreview
          previewType={state.previewType}
          theme={theme}
          primaryColour={state.primaryColour}
          backgroundColour={state.backgroundColour}
          isSmallScreenSize={state.isSmallScreenSize}
          ThemeSelectContainer={ThemeSelectContainer}
          Toggles={Toggles}
        />
      </section>
    </section>
  );
};

export default Home;
