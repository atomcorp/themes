import {getRandomColour} from './consoleMethods';

// examples test the colours against the background
const goodContrast = {
  black: '#FFFFFF',
  red: '#FFFFFF',
  green: '#FFFFFF',
  yellow: '#FFFFFF',
  blue: '#2D818F',
  purple: '#FFFFFF',
  cyan: '#FFFFFF',
  white: '#FFFFFF',
  background: '#FFFFFF',
};

const badContrast = {
  black: '#58B9CA',
  red: '#58B9CA',
  green: '#58B9CA',
  yellow: '#58B9CA',
  blue: '#58B9CA',
  purple: '#58B9CA',
  cyan: '#58B9CA',
  white: '#58B9CA',
  background: '#FFFFFF',
};

it('should produce random colours', () => {
  expect(getRandomColour()).toBe('');
  // should be roughly 4.5 accessible
  expect(getRandomColour(goodContrast)).toBe('#2D818F');
  expect(getRandomColour(badContrast)).toBe('#58B9CA');
});
