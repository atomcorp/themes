import React from 'react';

import Home from 'components/Home/Home';
import themeJson from 'colour-schemes.json';
import {themeType} from 'types';

const themes = themeJson as themeType[];

const App: React.FC = () => {
  return <Home themes={themes} />;
};

export default App;
