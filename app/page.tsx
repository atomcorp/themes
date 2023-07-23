import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';

import PreviewContainer from '@/components/PreviewContainer/PreviewContainer';
import TogglePreviewType from '@/components/TogglePreviewType/TogglePreviewType';
import ToggleLightness from '@/components/ToggleLightness/ToggleLightness';
import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import AddRemoveColorSchemeButton from '@/components/AddRemoveColorSchemeButton/AddRemoveColorSchemeButton';
import AddToClipboardButton from '@/components/AddToClipboardButton/AddToClipboardButton';

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
      <div className={css.copy}>
        <AddRemoveColorSchemeButton />
        <AddToClipboardButton />
      </div>
    </main>
  );
}
