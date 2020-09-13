import ResizeObserver from 'resize-observer-polyfill';
import {actionTypes} from 'types';

type titleColoursType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white';

export const returnInitialTheme = (search: string): string | null => {
  if (search.length > 0) {
    const params = new URLSearchParams(search);
    const themeName = params.get('theme');
    if (themeName != null) {
      return themeName;
    }
  }
  return null;
};

export const screenSizeObserver = (
  dispatch: React.Dispatch<actionTypes>
): ResizeObserver => {
  return new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const {width} = entries[0].contentRect;
    if (width >= 1024) {
      dispatch({type: 'SIZE', isSmallScreenSize: false});
    } else if (width < 1024) {
      dispatch({type: 'SIZE', isSmallScreenSize: true});
    }
  });
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

export const shortcuts = (
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

export const sampleColours = (theme: themeType | undefined): string[] => {
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
