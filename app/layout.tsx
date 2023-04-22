import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import CopyColorSchemeContext from '@/components/CopyColorSchemeContext/CopyColorSchemeContext';
import getColorSchemes from '@/requests/getColorSchemes';

/* c8 ignore next */
export const metadata = {
  title: 'Windows Terminal Colors',
  description: 'Browse and copy color schemes and themes for Windows Terminal',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSchemes = await getColorSchemes();
  return (
    <html lang="en">
      <body>
        <CopyColorSchemeContext>
          <ColorSchemesProvider colorSchemes={colorSchemes}>
            {children}
          </ColorSchemesProvider>
        </CopyColorSchemeContext>
      </body>
    </html>
  );
}
