import React, {useState, useEffect} from 'react';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
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
        setActiveTheme(json[Math.floor(Math.random() * json.length)].name);
      } catch (err) {
        console.error(err);
      }
    };
    request();
  }, []);
  const theme = themes.find((theme) => theme.name === activeTheme);
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <h1 className={css.title}>Windows Terminal Colours</h1>
        <ThemeList
          themeNames={themes.map((theme) => theme.name)}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
      </aside>
      <section className={css.content}>
        <Console theme={theme} />
        {theme && <Code theme={JSON.stringify(theme, null, 2)} />}
      </section>
    </section>
  );
};

export default Home;
