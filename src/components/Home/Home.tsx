import React, {useState, useEffect} from 'react';

import Console from 'components/Console/Console';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import Code from 'components/Code/Code';
import {themeType} from 'types';
import css from './Home.module.css';

const Home: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  const [activeTheme, setActiveTheme] = useState('');
  useEffect(() => {
    const request = async (): Promise<void> => {
      try {
        const response = await fetch('/colour-schemes.json');
        const json = await response.json();
        setThemes(json);
      } catch (err) {
        console.error(err);
      }
    };
    request();
  }, []);
  const theme = themes.find((theme) => theme.name === activeTheme);
  return (
    <section className={css.container}>
      <h1 className={css.title}>Windows Terminal Colours</h1>
      <ThemeSelect
        themeNames={themes.map((theme) => theme.name)}
        setActiveTheme={setActiveTheme}
      />
      <Console theme={theme} />
      {theme && <Code theme={JSON.stringify(theme, null, 2)} />}
    </section>
  );
};

export default Home;
