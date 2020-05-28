import React, {useEffect, useState} from 'react';

import Home from 'components/Home/Home';
import {themeType} from 'types';

// in development https://github.com/atomcorp/terminal-api needs to be installed and running
// package.json has a proxy which points stuff like this in dev to http://localhost:3001
const apiBase =
  process.env.NODE_ENV === 'development' ? '' : 'https://www.atomcorp.dev';

const App: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  useEffect(() => {
    const getThemes = async () => {
      try {
        const res = await fetch(`${apiBase}/api/v1/themes`);
        const themes = await res.json();
        setThemes(themes);
      } catch (error) {
        // use dynamic importing / code splitting
        import('backupthemes.json').then((backupthemes) => {
          setThemes(backupthemes.default);
        });
      }
    };
    getThemes();
  }, []);
  if (themes.length < 1) {
    return <div>Loading</div>;
  }
  return <Home themes={themes} />;
};

export default App;
