import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

it('renders component', () => {
  const {getByRole} = render(<Header />);
  expect(getByRole('heading')).toHaveTextContent('Windows Terminal Themes');
});
