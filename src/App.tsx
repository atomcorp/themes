import React, {useEffect, useState} from 'react';

import Home from 'components/Home/Home';
import {themeType} from 'types';

// in development https://github.com/atomcorp/terminal-api needs to be installed and running
const apiBase =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://atomcorp.dev';

const App: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  useEffect(() => {
    const getThemes = async () => {
      const res = await fetch(`${apiBase}/api/v1/themes`);
      const themes = await res.json();
      setThemes(themes);
    };
    getThemes();
  }, []);
  if (themes.length < 1) {
    return <div>Loading</div>;
  }
  return <Home themes={themes} />;
};

export default App;
