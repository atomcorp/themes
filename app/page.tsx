import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';

import PreviewContainer from '@/components/PreviewContainer/PreviewContainer';
import TogglePreviewType from '@/components/TogglePreviewType/TogglePreviewType';
import ToggleLightness from '@/components/ToggleLightness/ToggleLightness';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import AddColorSchemeButton from '@/components/CopyColorSchemes/AddColorSchemeButton';
import RemoveColorSchemeButton from '@/components/CopyColorSchemes/RemoveColorSchemeButton';
import ListCopiedColorSchemes from '@/components/CopyColorSchemes/ListCopiedColorSchemes';

import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.container}>
      <div className={css.options}>
        <ToggleLightness />
        <TogglePreviewType />
      </div>
      <PreviewContainer />
      <div className={css.select}>
        <NextPrevButton direction="prev" />
        <ColorSchemeSelector />
        <NextPrevButton direction="next" />
      </div>
      <div>
        <AddColorSchemeButton />
        <RemoveColorSchemeButton />
        <ListCopiedColorSchemes />
      </div>
    </main>
  );
}
