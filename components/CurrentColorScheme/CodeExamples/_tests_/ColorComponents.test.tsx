import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {
  Foreground,
  Background,
  Red,
  BrightRed,
  Green,
  BrightGreen,
  Yellow,
  BrightYellow,
} from '../ColorComponents';

const Mock = () => {
  return (
    <>
      <Foreground>Foreground</Foreground>
      <Background>Background</Background>
      <Red>Red</Red>
      <BrightRed>BrightRed</BrightRed>
      <Green>Green</Green>
      <BrightGreen>BrightGreen</BrightGreen>
      <Yellow>Yellow</Yellow>
      <BrightYellow>BrightYellow</BrightYellow>
    </>
  );
};

it('should render all the components', () => {
  render(<Mock />);
  expect(screen).toMatchSnapshot();
});
