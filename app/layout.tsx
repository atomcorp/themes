import {Inter} from 'next/font/google';

import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import CopyColorSchemeContext from '@/components/CopyColorSchemeContext/CopyColorSchemeContext';
import getColorSchemes from '@/requests/getColorSchemes';

import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleCurrentLightness from '@/components/ToggleCurrentLightness/ToggleCurrentLightness';
import AddColorSchemeButton from '@/components/CopyColorSchemes/AddColorSchemeButton';
import RemoveColorSchemeButton from '@/components/CopyColorSchemes/RemoveColorSchemeButton';
import ListCopiedColorSchemes from '@/components/CopyColorSchemes/ListCopiedColorSchemes';
import CurrentColorScheme from '@/components/CurrentColorScheme/CurrentColorScheme';
import Link from 'next/link';
import Header from '@/components/Header';

import './globals.css';

/* c8 ignore next */
export const metadata = {
  title: 'Windows Terminal Colors',
  description: 'Browse and copy color schemes and themes for Windows Terminal',
};

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSchemes = await getColorSchemes();
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CopyColorSchemeContext>
          <ColorSchemesProvider colorSchemes={colorSchemes}>
            <CurrentColorScheme>
              <Header />
              <Link href="/">Home</Link> | <Link href="/list">List</Link>
              <ToggleCurrentLightness />
              <ColorSchemeSelector />
              {children}
              <AddColorSchemeButton />
              <RemoveColorSchemeButton />
              <ListCopiedColorSchemes />
            </CurrentColorScheme>
          </ColorSchemesProvider>
        </CopyColorSchemeContext>
      </body>
    </html>
  );
}
