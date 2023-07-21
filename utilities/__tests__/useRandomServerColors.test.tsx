import {useState} from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {darkThemeA, lightThemeA} from '@/utilities/mockColorSchemes';
import useRandomColors from '../useRandomServerColors';

const MockColorSelect = () => {
  const [activeColorScheme, setActiveColorScheme] = useState(darkThemeA);
  const colors = useRandomColors(activeColorScheme);
  return (
    <div>
      <button
        onClick={() => {
          setActiveColorScheme(lightThemeA);
        }}
      >
        Set light color scheme
      </button>
      <ul>
        {colors.map((color) => (
          <li key={color}>{color}</li>
        ))}
      </ul>
    </div>
  );
};

it('should not randomise the first set of colours', () => {
  render(<MockColorSelect />);
  const listItems = screen.getAllByRole('listitem');
  const listTextContents = listItems.map((listItem) => listItem.textContent);
  expect(listTextContents).toEqual([
    darkThemeA.red,
    darkThemeA.green,
    darkThemeA.yellow,
    darkThemeA.blue,
    darkThemeA.purple,
  ]);
});

describe('scope randomisation', () => {
  // adding a retry as it's possible it might randomly equal the default set of colours
  // but it's pretty unlikely to happen 3 times in a row :/
  jest.retryTimes(3);

  it('should randomise the next set of colours', async () => {
    render(<MockColorSelect />);
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', {name: 'Set light color scheme'})
    );

    const listItems = screen.getAllByRole('listitem');
    const listTextContents = listItems.map((listItem) => listItem.textContent);
    expect(listTextContents).not.toEqual([
      lightThemeA.red,
      lightThemeA.green,
      lightThemeA.yellow,
      lightThemeA.blue,
      lightThemeA.purple,
    ]);
  });
});
