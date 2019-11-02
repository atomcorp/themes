import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

it('renders component', () => {
  const {getByText, getByRole} = render(<Header />);
  // console.log(getByText('Windows Terminal Themes'), getByRole('heading'));
  expect(getByRole('heading')).toHaveTextContent('Windows Terminal Themes');
  expect(getByText('Windows Terminal (Preview)')).toMatchSnapshot();
  expect(getByText('iTerm2 Color Schemes')).toMatchSnapshot();
  expect(getByText('Download all the themes')).toMatchSnapshot();
  expect(getByText('Github page')).toMatchSnapshot();
  // expect(asFragment()).toMatchSnapshot()
});
