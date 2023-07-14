'use client';

import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';

const ListCopiedColorSchemes = () => {
  const {copiedThemeNames} = useCopiedColorSchemes();
  return (
    <ul>
      {copiedThemeNames.sort().map((copiedThemeName) => (
        <li key={copiedThemeName}>{copiedThemeName}</li>
      ))}
    </ul>
  );
};

export default ListCopiedColorSchemes;
