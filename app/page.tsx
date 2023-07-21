import CodeExampleSelect from '@/components/CurrentColorScheme/CodeExampleSelect';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';

export default function Home() {
  return (
    <main>
      <NextPrevButton direction="prev" />
      <NextPrevButton direction="next" />
      <CodeExampleSelect />
    </main>
  );
}
