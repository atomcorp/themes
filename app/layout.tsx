import {Inter} from 'next/font/google';

import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import CopyColorSchemeProvider from '@/components/CopyColorSchemeContext/CopyColorSchemeProvider';
import getColorSchemes from '@/requests/getColorSchemes';

import ColorSchemeSelector from '@/components/ColorSchemeSelector/ColorSchemeSelector';
import ToggleLightness from '@/components/ToggleLightness/ToggleLightness';
import AddColorSchemeButton from '@/components/CopyColorSchemes/AddColorSchemeButton';
import RemoveColorSchemeButton from '@/components/CopyColorSchemes/RemoveColorSchemeButton';
import ListCopiedColorSchemes from '@/components/CopyColorSchemes/ListCopiedColorSchemes';
import ActiveColorSchemeWrapper from '@/components/ActiveColorSchemeWrapper/ActiveColorSchemeWrapper';
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
        <CopyColorSchemeProvider>
          <ColorSchemesProvider colorSchemes={colorSchemes}>
            <ActiveColorSchemeWrapper>
              <Header />
              <ToggleLightness />
              <ColorSchemeSelector />
              {children}
              <AddColorSchemeButton />
              <RemoveColorSchemeButton />
              <ListCopiedColorSchemes />
            </ActiveColorSchemeWrapper>
          </ColorSchemesProvider>
        </CopyColorSchemeProvider>
      </body>
    </html>
  );
}
