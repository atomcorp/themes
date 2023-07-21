import PreviewTab from '@/components/PreviewTab/PreviewTab';
import NextPrevButton from '@/components/NextPrevButton/NextPrevButton';

export default function Home() {
  return (
    <main>
      <NextPrevButton direction="prev" />
      <NextPrevButton direction="next" />
      <PreviewTab />
    </main>
  );
}
