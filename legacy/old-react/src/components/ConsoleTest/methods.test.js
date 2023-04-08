import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import {parseSyntax} from './methods';

const whimsyTheme = {
  name: 'Whimsy',
  black: '#535178',
  red: '#ef6487',
  green: '#5eca89',
  yellow: '#fdd877',
  blue: '#65aef7',
  purple: '#aa7ff0',
  cyan: '#43c1be',
  white: '#ffffff',
  brightBlack: '#535178',
  brightRed: '#ef6487',
  brightGreen: '#5eca89',
  brightYellow: '#fdd877',
  brightBlue: '#65aef7',
  brightPurple: '#aa7ff0',
  brightCyan: '#43c1be',
  brightWhite: '#ffffff',
  background: '#29283b',
  foreground: '#b3b0d6',
};

// https://stackoverflow.com/a/60347125/2368141
const hex2rgb = (c): string =>
  `rgb(${c
    .substr(1)
    .match(/../g)
    .map((x, i) => {
      if (i > 0) {
        return ` ${+`0x${x}`}`;
      }
      return +`0x${x}`;
    })})`;
// const rgb2hex = (c): string => '#' + c.match(/\d+/g).map((x) => (+x).toString(16).padStart(2, 0)).join``;

it('should have correct color and background', () => {
  const {findByText} = render(
    <div>
      {parseSyntax(
        whimsyTheme,
        '<green:brightYellow>Test green</green:brightYellow>'
      )}
    </div>
  );
  // .toHaveStyle() keeps failing for me :(
  findByText('Test green').then((el) => {
    expect(el.style.background).toBe(hex2rgb(whimsyTheme.brightYellow));
    expect(el.style.color).toBe(hex2rgb(whimsyTheme.green));
  });
});

it('should have style the different elements', async () => {
  const {findByText} = render(
    <div>
      {parseSyntax(
        whimsyTheme,
        `<green:brightYellow>Test green</green:brightYellow>
        <cyan>Some more</cyan> And some more text

        OK <brightWhite:brightGreen>white</brightWhite:brightGreen> and <purple>purple</purple>
        `
      )}
    </div>
  );
  // .toHaveStyle() keeps failing for me :(
  await findByText('Test green').then((el) => {
    expect(el.style.background).toBe(hex2rgb(whimsyTheme.brightYellow));
    expect(el.style.color).toBe(hex2rgb(whimsyTheme.green));
  });
  await findByText('Some more').then((el) => {
    expect(el.style.background).toBe('');
    expect(el.style.color).toBe(hex2rgb(whimsyTheme.cyan));
  });
  await findByText('white').then((el) => {
    expect(el.style.background).toBe(hex2rgb(whimsyTheme.brightGreen));
    expect(el.style.color).toBe(hex2rgb(whimsyTheme.brightWhite));
  });
  await findByText('purple').then((el) => {
    expect(el.style.background).toBe('');
    expect(el.style.color).toBe(hex2rgb(whimsyTheme.purple));
  });
});

it('should throw errors if invalid tags given', () => {
  expect(() => {
    parseSyntax(whimsyTheme, '<red>invalid</blue>');
  }).toThrow();
  expect(() => {
    parseSyntax(whimsyTheme, '<red:blue>invalid</red>');
  }).toThrow();
  expect(() => {
    parseSyntax(whimsyTheme, '<invalidcolour>invalid</invalidcolour>');
  }).toThrow();
  expect(() => {
    parseSyntax(whimsyTheme, '<green>invalid<green>');
  }).toThrow();
});

it('should have correct colors', async () => {
  const {findByText} = render(
    <div>
      {parseSyntax(
        whimsyTheme,
        `<green>green</green> 
<black>black</black>
<red>red</red>
<yellow>yellow</yellow>
<blue>blue</blue>
<purple>purple</purple>
<cyan>cyan</cyan>
<white>white</white>
<brightBlack>brightBlack</brightBlack>
<brightRed>brightRed</brightRed>
<brightGreen>brightGreen</brightGreen>
<brightYellow>brightYellow</brightYellow>
<brightBlue>brightBlue</brightBlue>
<brightPurple>brightPurple</brightPurple>
<brightCyan>brightCyan</brightCyan>
<brightWhite>brightWhite</brightWhite>
<background>background</background>
<foreground>foreground</foreground>
        `
      )}
    </div>
  );

  // I can't get testing library to loop D:
  const green = await findByText('green');
  expect(green.style.color).toBe(hex2rgb(whimsyTheme['green']));
  const brightPurple = await findByText('brightPurple');
  expect(brightPurple.style.color).toBe(hex2rgb(whimsyTheme['brightPurple']));
  const black = await findByText('black');
  expect(black.style.color).toBe(hex2rgb(whimsyTheme['black']));
  const red = await findByText('red');
  expect(red.style.color).toBe(hex2rgb(whimsyTheme['red']));
  const yellow = await findByText('yellow');
  expect(yellow.style.color).toBe(hex2rgb(whimsyTheme['yellow']));
  const blue = await findByText('blue');
  expect(blue.style.color).toBe(hex2rgb(whimsyTheme['blue']));
  const purple = await findByText('purple');
  expect(purple.style.color).toBe(hex2rgb(whimsyTheme['purple']));
  const cyan = await findByText('cyan');
  expect(cyan.style.color).toBe(hex2rgb(whimsyTheme['cyan']));
  const white = await findByText('white');
  expect(white.style.color).toBe(hex2rgb(whimsyTheme['white']));
  const brightBlack = await findByText('brightBlack');
  expect(brightBlack.style.color).toBe(hex2rgb(whimsyTheme['brightBlack']));
  const brightRed = await findByText('brightRed');
  expect(brightRed.style.color).toBe(hex2rgb(whimsyTheme['brightRed']));
  const brightGreen = await findByText('brightGreen');
  expect(brightGreen.style.color).toBe(hex2rgb(whimsyTheme['brightGreen']));
  const brightYellow = await findByText('brightYellow');
  expect(brightYellow.style.color).toBe(hex2rgb(whimsyTheme['brightYellow']));
  const brightBlue = await findByText('brightBlue');
  expect(brightBlue.style.color).toBe(hex2rgb(whimsyTheme['brightBlue']));
  const brightCyan = await findByText('brightCyan');
  expect(brightCyan.style.color).toBe(hex2rgb(whimsyTheme['brightCyan']));
  const brightWhite = await findByText('brightWhite');
  expect(brightWhite.style.color).toBe(hex2rgb(whimsyTheme['brightWhite']));
  const background = await findByText('background');
  expect(background.style.color).toBe(hex2rgb(whimsyTheme['background']));
  const foreground = await findByText('foreground');
  expect(foreground.style.color).toBe(hex2rgb(whimsyTheme['foreground']));
});

it('snapshot - should render a plain string', () => {
  const component = renderer.create(
    <div>{parseSyntax(whimsyTheme, 'String')}</div>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('snapshot - should wrap a string in a colour', () => {
  const component = renderer.create(
    <div>{parseSyntax(whimsyTheme, '<green>Test green</green>')}</div>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('snapshot - should wrap two strings in different colours', () => {
  const component = renderer.create(
    <div>
      {parseSyntax(
        whimsyTheme,
        '<green>Test green</green>some more text <red>Test green</red>'
      )}
    </div>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('snapshot - should wrap text with colour and a background', () => {
  const component = renderer.create(
    <div>
      {parseSyntax(
        whimsyTheme,
        '<green:brightYellow>Test green</green:brightYellow>some more text <red:background>Test red</red:background>'
      )}
    </div>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('snapshot - should work over multiple lines - no including <tags>', () => {
  const component = renderer.create(
    <div>
      {parseSyntax(
        whimsyTheme,
        `<green:brightYellow>Test green</green:brightYellow>
        
        A line break
        
        <red:background>Test red</red:background>`
      )}
    </div>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
