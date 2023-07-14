'use client';

import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';
import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';

const RemoveColorSchemeButton = () => {
  const {colorSchemeState} = useColorSchemes();
  const {copiedThemeNames, removeFromCopiedThemeNames} =
    useCopiedColorSchemes();

  return (
    <button
      disabled={
        !copiedThemeNames.includes(colorSchemeState.currentColorScheme.name)
      }
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={() => {
        removeFromCopiedThemeNames(colorSchemeState.currentColorScheme.name);
      }}
    >
      Remove {colorSchemeState.currentColorScheme.name} from list
    </button>
  );
};

export default RemoveColorSchemeButton;
