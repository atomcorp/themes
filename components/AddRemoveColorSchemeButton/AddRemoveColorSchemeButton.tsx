'use client';

import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';
import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';

import css from './AddRemoveColorSchemeButton.module.css';

const AddRemoveColorSchemeButton = () => {
  const {
    colorSchemeState: {activeColorScheme},
  } = useColorSchemes();
  const {copiedThemeNames, addToCopiedThemeNames, removeFromCopiedThemeNames} =
    useCopiedColorSchemes();

  const isAdded = copiedThemeNames.includes(activeColorScheme.name);

  return (
    <button
      className={css.button}
      data-state={isAdded ? 'added' : 'not-added'}
      type="button"
      onClick={() => {
        if (isAdded) {
          removeFromCopiedThemeNames(activeColorScheme.name);
        } else {
          addToCopiedThemeNames(activeColorScheme.name);
        }
      }}
    >
      {!isAdded
        ? `Add ${activeColorScheme.name}`
        : `Remove ${activeColorScheme.name}`}
    </button>
  );
};

export default AddRemoveColorSchemeButton;
