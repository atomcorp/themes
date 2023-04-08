export const metadata = {
  title: 'Windows Terminal Colors',
  description: 'Browse and copy color schemes and themes for Windows Terminal',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
