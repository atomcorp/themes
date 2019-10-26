import React, {useState, useEffect} from 'react';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
// import Code from 'components/Code/Code';
import {themeType} from 'types';
import css from './Home.module.css';
import Header from 'components/Header/Header';

const compare = (a: themeType, b: themeType): number => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const Home: React.FC = () => {
  const [themes, setThemes] = useState<themeType[]>([]);
  const [activeTheme, setActiveTheme] = useState('');
  useEffect(() => {
    const request = async (): Promise<void> => {
      try {
        const response = await fetch('/colour-schemes.json');
        const json = await response.json();
        setThemes(json.sort(compare));
        setActiveTheme(json[0].name);
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
        <Header />
        {window.innerWidth > 768 ? (
          <ThemeList
            themeNames={themes.map((theme) => theme.name)}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
          />
        ) : (
          <ThemeSelect
            themeNames={themes.map((theme) => theme.name)}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
          />
        )}
      </aside>
      <section className={css.content}>
        <Console theme={theme} />
        {/* theme && <Code theme={JSON.stringify(theme, null, 2)} /> */}
      </section>
    </section>
  );
};

export default Home;
