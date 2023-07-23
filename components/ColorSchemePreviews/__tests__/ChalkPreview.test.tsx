import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ChalkPreview from '../ChalkPreview';

test('test screenshot of ChalkPreview component', () => {
  render(<ChalkPreview />);
  expect(screen.getByRole('figure')).toMatchSnapshot();
});
