import React from 'react';
import {render, screen} from '@testing-library/react';
import useDefinedContext from './useDefinedContext';

it('should throw an error if context is undefined', () => {
  const Context = React.createContext(undefined);
  const Component = () => {
    useDefinedContext(Context);
    return null;
  };
  expect(() => {
    render(<Component />);
  }).toThrow();
});
