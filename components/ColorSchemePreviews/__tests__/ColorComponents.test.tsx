import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {
  Foreground,
  Red,
  BrightRed,
  Green,
  BrightGreen,
  Yellow,
  BrightYellow,
} from '../ColorComponents';
import css from '../ColorComponents.module.css';

const Mock = () => {
  return (
    <>
      <Foreground>Foreground</Foreground>
      <div className={css.background}>Background</div>
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
