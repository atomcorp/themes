import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import getColorSchemes from '@/requests/getColorSchemes';

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
        <ColorSchemesProvider colorSchemes={colorSchemes}>
          {children}
        </ColorSchemesProvider>
      </body>
    </html>
  );
}
