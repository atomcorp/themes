'use client';

import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';
import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

const RemoveColorSchemeButton = () => {
  const {
    colorSchemeState: {activeColorScheme},
  } = useColorSchemes();
  const {copiedThemeNames, removeFromCopiedThemeNames} =
    useCopiedColorSchemes();

  return (
    <button
      disabled={!copiedThemeNames.includes(activeColorScheme.name)}
      type="button"
      onClick={() => {
        removeFromCopiedThemeNames(activeColorScheme.name);
      }}
    >
      Remove {activeColorScheme.name} from list
    </button>
  );
};

export default RemoveColorSchemeButton;
