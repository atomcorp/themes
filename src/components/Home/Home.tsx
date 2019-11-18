import React, {useState, useEffect} from 'react';

import Console from 'components/Console/Console';
import ThemeList from 'components/ThemeList/ThemeList';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import {themeType} from 'types';
import css from './Home.module.css';
import Header from 'components/Header/Header';
import ResizeObserver from 'resize-observer-polyfill';

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
  const [isSmallScreenSize, setIsSmallScreenSize] = useState(
    window.innerWidth < 768
  );
  useEffect(() => {
    const request = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PUBLIC_PATH}/colour-schemes.json`
        );
        const json = await response.json();
        setThemes(json.sort(compare));
        setActiveTheme(json[0].name);
      } catch (err) {
        console.error(err);
      }
    };
    request();
    const resizer = new ResizeObserver((entries) => {
      const {width} = entries[0].contentRect;
      if (width > 768) {
        setIsSmallScreenSize(false);
      } else if (width < 768) {
        setIsSmallScreenSize(true);
      }
    });
    resizer.observe(document.body);
    return () => {
      resizer.unobserve(document.body);
    };
  }, []);
  const theme = themes.find((theme) => theme.name === activeTheme);
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <Header />
        {!isSmallScreenSize ? (
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
      </section>
    </section>
  );
};

export default Home;
