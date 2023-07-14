import getColorSchemes from '@/requests/getColorSchemes';
import Title from '@/components/Title/Title';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleCurrentLightness from '@/components/ToggleCurrentLightness/ToggleCurrentLightness';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';
import CurrentColorScheme from '@/components/CurrentColorScheme/CurrentColorScheme';
import CodeExampleSelect from '@/components/CurrentColorScheme/CodeExampleSelect';
import AddColorSchemeButton from '@/components/CopyColorSchemes/AddColorSchemeButton';
import filterColorSchemes from '@/utilities/filterColorSchemes';
import RemoveColorSchemeButton from '@/components/CopyColorSchemes/RemoveColorSchemeButton';
import ListCopiedColorSchemes from '@/components/CopyColorSchemes/ListCopiedColorSchemes';

export default async function Home() {
  const colorSchemes = await getColorSchemes();
  const {lightColorSchemes, darkColorSchemes} =
    filterColorSchemes(colorSchemes);
  return (
    <main>
      <Title />
      <ToggleCurrentLightness />
      <ColorSchemeSelector
        lightColorSchemes={lightColorSchemes}
        darkColorSchemes={darkColorSchemes}
      />
      <NextPrevButton direction="prev" />
      <NextPrevButton direction="next" />
      <CurrentColorScheme>
        <CodeExampleSelect />
      </CurrentColorScheme>
      <AddColorSchemeButton />
      <RemoveColorSchemeButton />
      <ListCopiedColorSchemes />
    </main>
  );
}
