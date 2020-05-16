import React, {useEffect, useState} from 'react';

import Home from 'components/Home/Home';
import {themeType} from 'types';
import Skeleton from 'components/Skeleton/Skeleton';

/**
 * in development https://github.com/atomcorp/terminal-api needs to be installed and running
 * for this to work
 * package.json has a proxy which redirects stuff it can't find to http://localhost:3001
 * then, apiBase can either be '' or http://localhost:3000 (ie the react apps domain)
 */
const apiBase =
  process.env.NODE_ENV === 'development' ? '' : 'https://www.atomcorp.dev';

const App: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  useEffect(() => {
    const getThemes = async () => {
      const res = await fetch(`${apiBase}/api/v1/themes`, {});
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
