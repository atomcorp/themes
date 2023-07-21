import Logo from '@/components/Title/Logo';

import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.container}>
      <Logo />
      <h1 className={css.title}>Windows Terminal Themes</h1>
    </header>
  );
};

export default Header;
