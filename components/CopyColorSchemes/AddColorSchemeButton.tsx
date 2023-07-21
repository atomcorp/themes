'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';

const AddColorSchemeButton = () => {
  const {colorSchemeState} = useColorSchemes();
  const {copiedThemeNames, addToCopiedThemeNames} = useCopiedColorSchemes();

  const activeColorSchemeName = colorSchemeState.activeColorScheme.name;

  return (
    <button
      disabled={copiedThemeNames.includes(activeColorSchemeName)}
      type="button"
      onClick={() => {
        addToCopiedThemeNames(activeColorSchemeName);
      }}
    >
      Add {activeColorSchemeName} to list
    </button>
  );
};

export default AddColorSchemeButton;
