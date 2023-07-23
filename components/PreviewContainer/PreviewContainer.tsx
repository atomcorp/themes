'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import JestPreview from '@/components/ColorSchemePreviews/JestPreview';
import ChalkPreview from '@/components/ColorSchemePreviews/ChalkPreview';

import css from './PreviewContainer.module.css';

const PreviewContainer = () => {
  const {
    colorSchemeState: {previewType},
  } = useColorSchemes();
  return (
    <section className={css.container}>
      {previewType === 'terminal' && <JestPreview />}
      {previewType === 'chalk' && <ChalkPreview />}
    </section>
  );
};

export default PreviewContainer;
