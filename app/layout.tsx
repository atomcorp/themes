import {Inter} from 'next/font/google';

import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import CopyColorSchemeProvider from '@/components/CopyColorSchemeContext/CopyColorSchemeProvider';
import getColorSchemes from '@/requests/getColorSchemes';

import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import Header from '@/components/Header';
import BackgroundColor from '@/components/BackgroundColor/BackgroundColor';

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
            <LayoutWrapper>
              <Header />
              <BackgroundColor>{children}</BackgroundColor>
            </LayoutWrapper>
          </ColorSchemesProvider>
        </CopyColorSchemeProvider>
      </body>
    </html>
  );
}
