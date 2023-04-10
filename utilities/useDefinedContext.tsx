import {useContext} from 'react';

// this is to allow use to use undefined context in default value
// and would show an error if the context wasn't defined in a provider
const useDefinedContext = <T,>(context: React.Context<T>) => {
  const value = useContext(context);
  if (value === undefined) {
    throw new Error(`${context.displayName} is undefined`);
  }
  return value;
};

export default useDefinedContext;
