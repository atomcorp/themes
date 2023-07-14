import {colorSchemeAndMeta} from '@/types';
import {
  CopiedThemeNamesContext,
  SetCopiedThemeNamesContext,
} from './CopyColorSchemeContext';
import useDefinedContext from '@/utilities/useDefinedContext';

const useCopiedColorSchemes = () => {
  const copiedThemeNames = useDefinedContext(CopiedThemeNamesContext);
  const setCopiedThemeNames = useDefinedContext(SetCopiedThemeNamesContext);

  const addToCopiedThemeNames = (name: colorSchemeAndMeta['name']) => {
    setCopiedThemeNames((prevThemeNames) => {
      if (!prevThemeNames.includes(name)) {
        return [...prevThemeNames, name];
      }
      return prevThemeNames;
    });
  };

  const removeFromCopiedThemeNames = (name: colorSchemeAndMeta['name']) => {
    setCopiedThemeNames((prev) => prev.filter((n) => n !== name));
  };

  return {
    copiedThemeNames,
    addToCopiedThemeNames,
    removeFromCopiedThemeNames,
  };
};

export default useCopiedColorSchemes;
