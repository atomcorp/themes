import Title from '@/components/Title/Title';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleCurrentLightness from '@/components/ToggleCurrentLightness/ToggleCurrentLightness';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';
import CurrentColorScheme from '@/components/CurrentColorScheme/CurrentColorScheme';
import CodeExampleSelect from '@/components/CurrentColorScheme/CodeExampleSelect';
import AddColorSchemeButton from '@/components/CopyColorSchemes/AddColorSchemeButton';
import RemoveColorSchemeButton from '@/components/CopyColorSchemes/RemoveColorSchemeButton';
import ListCopiedColorSchemes from '@/components/CopyColorSchemes/ListCopiedColorSchemes';

export default function Home() {
  return (
    <main>
      <Title />
      <ToggleCurrentLightness />
      <ColorSchemeSelector />
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
