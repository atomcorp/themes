import {Inter} from 'next/font/google';
import getColorSchemes from '@/requests/getColorSchemes';
import Title from '@/components/Title/Title';

const inter = Inter({subsets: ['latin']});

export default async function Home() {
  const colorSchemes = await getColorSchemes();
  return (
    <main>
      <Title />
      <ul>
        {colorSchemes.map((colorScheme) => (
          <li key={colorScheme.name}>{colorScheme.name}</li>
        ))}
      </ul>
    </main>
  );
}
