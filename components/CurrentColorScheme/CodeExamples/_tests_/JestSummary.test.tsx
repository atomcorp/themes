import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import JestSummary from '../JestSummary';

it('should render all the components', () => {
  render(<JestSummary />);
  expect(screen.getByRole('figure')).toMatchSnapshot();
});
