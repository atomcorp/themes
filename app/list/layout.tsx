import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';

export default function Layout(props: {
  children: React.ReactNode;
  light: React.ReactNode;
  dark: React.ReactNode;
}) {
  return <>{props.children}</>;
}
