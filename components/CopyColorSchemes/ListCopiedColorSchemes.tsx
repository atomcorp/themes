'use client';

import useDefinedContext from '@/utilities/useDefinedContext';
import {CopiedThemeNamesContext} from '@/components/CopyColorSchemeContext/CopyColorSchemeContext';

const ListCopiedColorSchemes = () => {
  const copiedColorSchemes = useDefinedContext(CopiedThemeNamesContext);
  return (
    <ul>
      {copiedColorSchemes.sort().map((copiedColorScheme) => (
        <li key={copiedColorScheme}>{copiedColorScheme}</li>
      ))}
    </ul>
  );
};

export default ListCopiedColorSchemes;
