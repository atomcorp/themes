import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Title from '@/components/Title/Title';

// test for Title
describe('Title', () => {
  it('should render correctly', () => {
    render(<Title />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'Windows Terminal Themes'
    );
  });
});
