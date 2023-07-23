'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import JestPreview from '@/components/ColorSchemePreviews/JestPreview';
import ChalkPreview from '@/components/ColorSchemePreviews/ChalkPreview';

const PreviewContainer = () => {
  const {
    colorSchemeState: {previewType},
  } = useColorSchemes();
  return (
    <section>
      {previewType === 'terminal' && <JestPreview />}
      {previewType === 'chalk' && <ChalkPreview />}
    </section>
  );
};

export default PreviewContainer;
