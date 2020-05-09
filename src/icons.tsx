import React from 'react';

type IconProps = {
  colour?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
};

export const Share = (props: IconProps) => (
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
    <title id="share">Share theme</title>
    <path
      d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
      fill={props.colour}
    />
  </svg>
);

export const Download = (props: IconProps) => (
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
    <title id="download">Download theme</title>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill={props.colour} />
  </svg>
);

export const Light = (props: IconProps) => (
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

export const Dark = (props: IconProps) => (
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

export const Colours = (props: IconProps) => (
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

export const Console = (props: IconProps) => (
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
