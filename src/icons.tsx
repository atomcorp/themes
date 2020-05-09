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
    style={{transform: 'scaleX(-1)'}}
  >
    <title id="title">Share theme</title>
    <path
      d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
      fill={props.colour}
    />
    <path d="M0 0h24v24H0z" fill="none" />
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
  >
    <title id="title">Download theme</title>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill={props.colour} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);
