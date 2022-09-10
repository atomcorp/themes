import React, {useEffect, useState} from 'react';
import {saveAs} from 'file-saver';

import Home from 'components/Home/Home';
import {themeType} from 'types';
import Skeleton from 'components/Skeleton/Skeleton';
import MoreContent from 'components/More/MoreContent';

/**
 * in development https://github.com/atomcorp/terminal-api needs to be installed and running
 * for this to work
 * package.json has a proxy which redirects stuff it can't find to http://localhost:3001
 * then, apiBase can either be '' or http://localhost:3000 (ie the react apps domain)
 */
const apiBase =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://2zrysvpla9.execute-api.eu-west-2.amazonaws.com/prod';

const App: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  useEffect(() => {
    const getThemes = async (): Promise<void> => {
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
  const downloadAllThemes = (): void => {
    const themeBlob = new Blob(
      [
        JSON.stringify(
          themes.map((theme) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {meta, ...rest} = theme;
            return rest;
          }),
          null,
          2
        ),
      ],
      {
        type: 'application/json',
      }
    );
    saveAs(themeBlob, 'windows-terminal-themes.json', {autoBom: true});
  };
  if (themes.length < 1) {
    return <Skeleton />;
  }
  return (
    <>
      <Home themes={themes} />
      <MoreContent downloadAllThemes={downloadAllThemes} />
    </>
  );
};

export default App;
