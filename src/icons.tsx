import React from 'react';

type IconProps = {
  colour?: string;
  backgroundColour?: string;
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

export const Copy = (props: IconProps) => (
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
      backgroundColor: props.backgroundColour,
    }}
  >
    <title id="copy">Share theme</title>
    <path
      fill={props.colour}
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"
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
    <title id="download">Download all the themes</title>
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

export const Github = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || '24px'}
    width={props.size || '24px'}
    viewBox="0 0 438.549 438.549"
    aria-labelledby="title"
    onClick={props.onClick}
    className={props.className}
    style={{
      stroke: props.colour,
      outlineColor: props.colour,
    }}
  >
    <title id="github-icon">Github repo link</title>
    <path
      d="m409.13 114.57c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.06-29.408-39.781 0-76.472 9.804-110.06 29.408-33.596 19.605-60.192 46.204-79.8 79.8-19.605 33.595-29.408 70.281-29.408 110.06 0 47.78 13.94 90.745 41.827 128.91 27.884 38.164 63.906 64.572 108.06 79.227 5.14 0.954 8.945 0.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-0.571-0.049-5.708-0.144-15.417-0.098-9.709-0.144-18.179-0.144-25.406l-6.567 1.136c-4.187 0.767-9.469 1.092-15.846 1-6.374-0.089-12.991-0.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-0.572-1.335-0.098-2.43 1.427-3.289s4.281-1.276 8.28-1.276l5.708 0.853c3.807 0.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136s11.704-0.476 16.274-1.423c4.565-0.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-0.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.07-79.226 27.88-38.161 41.825-81.126 41.825-128.91-0.01-39.771-9.818-76.454-29.414-110.05z"
      fill={props.colour}
    />
  </svg>
);
