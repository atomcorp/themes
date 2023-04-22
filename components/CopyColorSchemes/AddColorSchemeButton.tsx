'use client';

import {CurrentColorSchemeContext} from '@/components/ColorSchemeContext/ColorSchemeContext';
import useDefinedContext from '@/utilities/useDefinedContext';
import {
  CopiedThemeNamesContext,
  SetCopiedThemeNamesContext,
} from '@/components/CopyColorSchemeContext/CopyColorSchemeContext';

const AddColorSchemeButton = () => {
  const currentColorScheme = useDefinedContext(CurrentColorSchemeContext);
  const handleAddColorScheme = useDefinedContext(SetCopiedThemeNamesContext);
  const copiedColorSchemes = useDefinedContext(CopiedThemeNamesContext);
  return (
    <button
      disabled={copiedColorSchemes.includes(currentColorScheme.name)}
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={() => {
        handleAddColorScheme(currentColorScheme.name);
      }}
    >
      Add to {currentColorScheme.name} to list
    </button>
  );
};

export default AddColorSchemeButton;
