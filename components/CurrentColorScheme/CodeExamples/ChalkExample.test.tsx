import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ChalkExample from './ChalkExample';

test('test screenshot of ChalkExample component', () => {
  render(<ChalkExample />);
  expect(screen.getByRole('figure')).toMatchSnapshot();
});
