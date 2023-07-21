import {ReactNode} from 'react';

import getStyle from '@/components/ColorSchemePreviews/getStyle';

type BaseProps = {
  children: ReactNode;
  color: string;
  bold?: boolean;
  dim?: boolean;
  inverse?: boolean;
};

const Base = (props: BaseProps) => {
  const {children, color, bold, dim, inverse} = props;
  const style = getStyle(color, {bold, dim, inverse});
  if (color === 'background') {
    return (
      <div
        style={{
          backgroundColor: 'var(--background)',
        }}
      >
        {children}
      </div>
    );
  }
  return <span style={style}>{children}</span>;
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
