import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

import {
  Foreground,
  Red,
  Green,
  Yellow,
} from '@/components/ColorSchemePreviews/ColorComponents';

import css from '@/components/ColorSchemePreviews/ColorComponents.module.css';

const Gaps = ({count}: {count: number}) => <>{Array(count).fill(' ')}</>;

const JestPreview = () => {
  return (
    <figure className={css.container}>
      <figcaption>
        <VisuallyHidden>
          Terminal code styled in the active color themes
        </VisuallyHidden>
      </figcaption>
      <div className={css.background}>
        <div>
          <Green bold inverse>
            {' '}
            PASS{' '}
          </Green>{' '}
          <Foreground dim>components/ToggleLightness/</Foreground>
          <Foreground bold>ToggleLightness.test.tsx</Foreground>
        </div>
        <div>
          <Red bold inverse>
            {' '}
            FAIL{' '}
          </Red>{' '}
          <Foreground dim>components/NextPrevButton/</Foreground>
          <Foreground bold>NextPrevButton.test.tsx</Foreground>
        </div>
        <div>
          <Foreground bold>Test Suites: </Foreground>
          <Red bold>1 failed</Red>, <Green bold>9 passed</Green>, 10 total
        </div>
        <div>
          <Foreground bold>
            Time: <Gaps count={6} />
          </Foreground>{' '}
          <Yellow bold>2.897</Yellow>
        </div>
        <div>
          <Foreground dim>Ran all test suites.</Foreground>
        </div>
      </div>
    </figure>
  );
};

export default JestPreview;
