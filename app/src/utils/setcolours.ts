import {shadeType} from 'types';

const root = document.documentElement;

type cssvarType = {
  '--btn__bg-img': string;
  '--btn__bg-border': string;
  '--btn__colour': string;
  '--btn__bg-img--hover': string;
  '--btn__bg-color': string;
  '--btn__border-colour__active': string;
  '--btn__insert': string;
  '--toolbar__color': string;
  '--toolbar__background': string;
  '--btn-primary__bg-img': string;
  '--btn-primary__bg-img---hover': string;
  '--btn-primary__colour': string;
  '--link-colour': string;
  '--link-colour--visited': string;
  '--overlay-background': string;
};

const cssvarDark: cssvarType = {
  '--btn__bg-img': 'linear-gradient(-180deg, #535659 0%, #424549 90%)',
  '--btn__bg-border': '1px solid rgba(200, 200, 200, 0.15)',
  '--btn__colour': '#d6d8da',
  '--btn__bg-img--hover': 'linear-gradient(-180deg, #535659, #535659 90%)',
  '--btn__bg-color': '#404040',
  '--btn__border-colour__active': 'rgba(200, 200, 200, 0.3)',
  '--btn__insert': 'inset 0 0.15em 0.3em rgba(20, 22, 23, 0.15)',
  '--btn-primary__bg-img': 'linear-gradient(-180deg,#2fcb53,#269f42 90%)',
  '--btn-primary__colour': '#d6d8da',
  '--btn-primary__bg-img---hover': 'linear-gradient(180deg, #484 5%, #171 90%)',
  '--toolbar__color': '#ededed',
  '--toolbar__background': '#202020',
  '--link-colour': '#5bb3f4',
  '--link-colour--visited': '#a292ef',
  '--overlay-background': 'rgba(7, 7, 7, 0.54)',
};

const cssvarLight: cssvarType = {
  '--btn__bg-img': 'linear-gradient(-180deg, #fafbfc, #eff3f6 90%)',
  '--btn__bg-border': '1px solid rgba(27, 31, 35, .35)',
  '--btn__colour': '#24292e',
  '--btn__bg-img--hover': 'linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%)',
  '--btn__bg-color': '#e9ecef',
  '--btn__border-colour__active': 'rgba(27, 31, 35, .3)',
  '--btn__insert': 'inset 0 .15em .3em rgba(27, 31, 35, .15)',
  '--btn-primary__bg-img': 'linear-gradient(-180deg,#2fcb53,#269f42 90%)',
  '--btn-primary__bg-img---hover': 'linear-gradient(180deg, #373 0%, #060 90%)',
  '--btn-primary__colour': '#d6d8da',
  '--toolbar__color': '#282c34',
  '--toolbar__background': '#e1e4e8',
  '--link-colour': '#224fd4',
  '--link-colour--visited': '#9e04bf',
  '--overlay-background': 'rgba(230, 230, 230, 0.48)',
};

const setcolours = (type: shadeType): void => {
  Object.entries(type === 'LIGHT' ? cssvarLight : cssvarDark).forEach(
    ([key, val]) => {
      root.style.setProperty(key, val);
    }
  );
};

export default setcolours;
