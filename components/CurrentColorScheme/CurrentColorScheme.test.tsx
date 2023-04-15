import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import {lightThemeA} from '@/utilities/mockColorSchemes';
import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';

import CurrentColorScheme from './CurrentColorScheme';

it('should render the current color scheme', () => {
  render(
    <CurrentColorSchemeContext.Provider value={lightThemeA}>
      <CurrentColorScheme>
        <div />
      </CurrentColorScheme>
    </CurrentColorSchemeContext.Provider>
  );

  expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
    lightThemeA.name
  );
});
