import {CSSProperties, ReactNode} from 'react';

import colorScheme from '@/components/CurrentColorScheme/CurrentColorScheme.module.css';

type options = {
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
};

const getClasses = (color: string, options: options) => {
  const classes = [];
  if (options.inverse) {
    classes.push(colorScheme.inverse);
  } else {
    classes.push(colorScheme[color]);
  }
  if (options.bold) {
    classes.push(colorScheme.bold);
  }
  if (options.dim) {
    classes.push(colorScheme.dim);
  }
  return classes.join(' ');
};

type BaseProps = {
  children: ReactNode;
  color: string;
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
};

interface StyleProps extends CSSProperties {
  '--color'?: string;
}

const Base = (props: BaseProps) => {
  const {children, color, bold, dim, inverse} = props;
  const classes = getClasses(color, {bold, dim, inverse});
  if (color === 'background') {
    return <div className={classes}>{children}</div>;
  }
  return (
    <span
      style={
        {
          '--color': inverse ? `var(--${color})` : undefined,
        } as StyleProps
      }
      className={classes}
    >
      {children}
    </span>
  );
};

type ColorProps = {
  children: ReactNode;
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
};

export const Foreground = (props: ColorProps) => (
  <Base color="foreground" {...props} />
);
export const Background = (props: ColorProps) => (
  <Base color="background" {...props} />
);
export const Red = (props: ColorProps) => <Base color="red" {...props} />;
export const BrightRed = (props: ColorProps) => (
  <Base color="brightRed" {...props} />
);
export const Green = (props: ColorProps) => <Base color="green" {...props} />;
export const BrightGreen = (props: ColorProps) => (
  <Base color="brightGreen" {...props} />
);
export const Yellow = (props: ColorProps) => <Base color="yellow" {...props} />;
export const BrightYellow = (props: ColorProps) => (
  <Base color="brightYellow" {...props} />
);
