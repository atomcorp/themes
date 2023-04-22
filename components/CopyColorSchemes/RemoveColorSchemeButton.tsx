'use client';

import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import useDefinedContext from '@/utilities/useDefinedContext';
import {
  CopiedThemeNamesContext,
  RemoveCopiedThemeNamesContext,
} from '@/components/CopyColorSchemeContext/CopyColorSchemeContext';

const RemoveColorSchemeButton = () => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const handleRemoveColorScheme = useDefinedContext(
    RemoveCopiedThemeNamesContext
  );
  const copiedColorSchemes = useDefinedContext(CopiedThemeNamesContext);
  return (
    <button
      disabled={!copiedColorSchemes.includes(currentColorScheme.name)}
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={() => {
        handleRemoveColorScheme(currentColorScheme.name);
      }}
    >
      Remove {currentColorScheme.name} from list
    </button>
  );
};

export default RemoveColorSchemeButton;
