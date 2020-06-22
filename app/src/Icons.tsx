import React from 'react';

type IconProps = {
  colour?: string;
  backgroundColour?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export const Share = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '18px'}
    width={props.size || '18px'}
    viewBox="0 0 24 24"
    aria-labelledby="share"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      backgroundColor: props.backgroundColour,
      transform: 'scaleX(-1)',
    }}
  >
    <title id="share">Share theme</title>
    <path
      d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
      fill={props.colour}
    />
  </svg>
);

export const Copy = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '18px'}
    width={props.size || '18px'}
    viewBox="0 0 24 24"
    aria-labelledby="copy"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      backgroundColor: props.backgroundColour,
    }}
  >
    <title id="copy">Copy theme</title>
    <path
      fill={props.colour}
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"
    />
  </svg>
);

export const Download = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
    }}
  >
    <title id="download">Download all the themes</title>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill={props.colour} />
  </svg>
);

export const Light = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      outlineColor: props.colour,
    }}
  >
    <title id="light-themes">Select light themes</title>
    <path
      d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
      fill={props.colour}
    />
  </svg>
);

export const Dark = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      outlineColor: props.colour,
    }}
  >
    <title id="dark-themes">Select dark themes</title>
    <path
      d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"
      fill={props.colour}
    />
  </svg>
);

export const Colours = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      outlineColor: props.colour,
    }}
  >
    <title id="colours-preview">Select colours test preview</title>
    <path
      d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={props.colour}
    />
  </svg>
);

export const Console = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      outlineColor: props.colour,
    }}
  >
    <title id="codeblock-preview">Select codeblock preview</title>
    <path
      d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
      fill={props.colour}
    />
  </svg>
);

export const Github = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 16 16"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      outlineColor: props.colour,
    }}
  >
    <title id="github-icon">Github repo link</title>
    <path
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      fill={props.colour}
    />
  </svg>
);

export const Help = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      outlineColor: props.colour,
    }}
  >
    <title id="help-icon">Show the help section</title>
    <path
      d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
      fill={props.colour}
    />
  </svg>
);

export const Arrow = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      outlineColor: props.colour,
      transform: props.direction === 'right' ? 'scaleX(-1)' : '',
    }}
  >
    <title id="arrow">{'Show previous theme'}</title>
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      fill={props.colour}
    />
  </svg>
);

const iterateColours = (arr: string[], index: number): string => {
  if (index === 0) {
    return [...arr, arr[0]].join(';');
  }
  return [...arr.slice(index), ...arr.slice(0, index - 1), arr[index]].join(
    ';'
  );
};

type LogoType = {
  colours: string[];
};

export const Logo = (props: IconProps & LogoType): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 512 512"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      outlineColor: props.colour,
    }}
  >
    <defs>
      <linearGradient id="logo-gradient" x2="0.35" y2="1">
        {props.colours.map(
          (colour: string, i, originalArr): JSX.Element => (
            <stop
              key={i}
              offset={`${Math.floor((i / (originalArr.length - 1)) * 100)}%`}
              stopColor={colour}
            >
              <animate
                attributeName="stop-color"
                values={iterateColours(originalArr, i)}
                dur="4s"
                repeatCount="indefinite"
              ></animate>
            </stop>
          )
        )}
      </linearGradient>
    </defs>
    <path
      fill="url(#logo-gradient)"
      d="M495.304 61.217H16.696C7.475 61.217 0 68.693 0 77.913v356.174c0 9.22 7.475 16.696 16.696 16.696h478.609c9.22 0 16.696-7.475 16.696-16.696V77.913c-.001-9.22-7.476-16.696-16.697-16.696zm-16.695 356.174H33.391V194.424h445.217v222.967zm0-256.358H33.391V94.609h445.217v66.424z"
    />
    <path
      fill="url(#logo-gradient)"
      d="M443.568 103.247c-12.275 0-22.261 9.986-22.261 22.261 0 12.275 9.985 22.261 22.261 22.261 12.275 0 22.261-9.986 22.261-22.261 0-12.275-9.986-22.261-22.261-22.261zM382.926 103.247c-12.275 0-22.261 9.986-22.261 22.261 0 12.275 9.986 22.261 22.261 22.261s22.261-9.986 22.261-22.261c0-12.275-9.986-22.261-22.261-22.261zM322.285 103.247c-12.275 0-22.261 9.986-22.261 22.261 0 12.275 9.985 22.261 22.261 22.261 12.275 0 22.261-9.986 22.261-22.261 0-12.275-9.986-22.261-22.261-22.261zM235.45 293.193l-54.653-46.504c-7.022-5.976-17.559-5.128-23.535 1.896-5.976 7.022-5.127 17.559 1.896 23.535l39.709 33.789-39.709 33.789c-7.023 5.976-7.871 16.512-1.896 23.535 5.975 7.022 16.512 7.871 23.535 1.896l54.653-46.504c7.83-6.663 7.83-18.771 0-25.432zM342.022 335.716h-65.954c-9.22 0-16.696 7.475-16.696 16.696s7.475 16.696 16.696 16.696h65.954c9.22 0 16.696-7.475 16.696-16.696s-7.476-16.696-16.696-16.696z"
    />
  </svg>
);

export const Chevron = (props: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 24 24"
    onClick={props.onClick}
    className={props.className}
    style={{
      outlineColor: props.colour,
      transform: props.direction === 'up' ? 'scaleY(1)' : '',
    }}
  >
    <path
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
      fill={props.colour}
    />
  </svg>
);
