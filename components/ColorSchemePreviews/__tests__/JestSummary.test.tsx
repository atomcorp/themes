import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import JestSummary from '../JestPreview';

it('should render all the components', () => {
  render(<JestSummary />);
  expect(screen.getByRole('figure')).toMatchSnapshot();
});
