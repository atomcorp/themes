import {CSSProperties} from 'react';

type options = {
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

const getStyle = (color: string, options: options) => {
  const style = {} as CSSProperties;

  if (options.inverse) {
    style.color = 'var(--background)';
    style.backgroundColor = `var(--${color})`;
  } else {
    style.color = `var(--${color})`;
  }
  if (options.bold) {
    style.fontWeight = 700;
  }
  if (options.dim) {
    style.opacity = 0.5;
  }
  if (options.underline) {
    style.textDecoration = 'underline';
  }
  if (options.strikethrough) {
    style.textDecoration = 'line-through';
  }
  return style;
};

export default getStyle;
