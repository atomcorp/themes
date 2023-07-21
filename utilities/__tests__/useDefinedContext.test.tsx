import {createContext} from 'react';
import {render} from '@testing-library/react';
import useDefinedContext from '../useDefinedContext';

it('should throw an error if context is undefined', () => {
  const Context = createContext(undefined);
  const Component = () => {
    useDefinedContext(Context);
    return null;
  };
  expect(() => {
    render(<Component />);
  }).toThrow();
});
