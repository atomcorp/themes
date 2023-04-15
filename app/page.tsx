import getColorSchemes from '@/requests/getColorSchemes';
import Title from '@/components/Title/Title';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleCurrentLightness from '@/components/ToggleCurrentLightness/ToggleCurrentLightness';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';
import CurrentColorScheme from '@/components/CurrentColorScheme/CurrentColorScheme';
import CodeExampleSelect from '@/components/CurrentColorScheme/CodeExampleSelect';

export default async function Home() {
  const colorSchemes = await getColorSchemes();
  return (
    <main>
      <Title />
      <ToggleCurrentLightness />
      <ColorSchemeSelector />
      <NextPrevButton colorSchemes={colorSchemes} direction="prev" />
      <NextPrevButton colorSchemes={colorSchemes} direction="next" />
      <CurrentColorScheme>
        <CodeExampleSelect />
      </CurrentColorScheme>
    </main>
  );
}
