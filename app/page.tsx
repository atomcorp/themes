import {Inter} from 'next/font/google';
import getColorSchemes from '@/requests/getColorSchemes';
import Title from '@/components/Title/Title';
import TempThemeButton from '@/components/TempThemeButton';
import TempCurrentSelectedTheme from '@/components/TempCurrentSelectedTheme';

const inter = Inter({subsets: ['latin']});

export default async function Home() {
  const colorSchemes = await getColorSchemes();
  return (
    <main>
      <Title />
      <TempCurrentSelectedTheme />
      <ul>
        {colorSchemes.map((colorScheme) => (
          <li key={colorScheme.name}>
            {colorScheme.name} <TempThemeButton name={colorScheme.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}
