'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';

const AddColorSchemeButton = () => {
  const {colorSchemeState} = useColorSchemes();
  const {copiedThemeNames, addToCopiedThemeNames} = useCopiedColorSchemes();

  const currentColorSchemeName = colorSchemeState.currentColorScheme.name;

  return (
    <button
      disabled={copiedThemeNames.includes(currentColorSchemeName)}
      type="button"
      onClick={() => {
        addToCopiedThemeNames(currentColorSchemeName);
      }}
    >
      Add {currentColorSchemeName} to list
    </button>
  );
};

export default AddColorSchemeButton;
