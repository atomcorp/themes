import {Inter} from 'next/font/google';
import getColorSchemes from '@/requests/getColorSchemes';
import Title from '@/components/Title/Title';
import TempThemeButton from '@/components/TempThemeButton';
import TempCurrentSelectedTheme from '@/components/TempCurrentSelectedTheme';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleCurrentLightness from '@/components/ToggleCurrentLightness/ToggleCurrentLightness';
import ColorSchemeContextMock from '@/components/ColorSchemeContext/ColorSchemeContextMock';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';

const inter = Inter({subsets: ['latin']});

export default async function Home() {
  const colorSchemes = await getColorSchemes();
  return (
    <main>
      <Title />
      <TempCurrentSelectedTheme />
      <ToggleCurrentLightness />
      <ColorSchemeSelector colorSchemes={colorSchemes} />
      <NextPrevButton colorSchemes={colorSchemes} direction="next" />
      <NextPrevButton colorSchemes={colorSchemes} direction="prev" />
      <ul>
        {colorSchemes.map((colorScheme) => (
          <li key={colorScheme.name}>
            {colorScheme.name} ({colorScheme.meta.isDark ? 'Dark' : 'Light'}){' '}
            <TempThemeButton name={colorScheme.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}
