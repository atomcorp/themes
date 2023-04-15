import {
  Foreground,
  Background,
  Red,
  Green,
  Yellow,
} from '@/components/CurrentColorScheme/CodeExamples/ColorComponents';

const Gaps = ({count}: {count: number}) => <>{Array(count).fill(' ')}</>;

const JestSummary = () => {
  return (
    <figure>
      <figcaption>Jest summary example</figcaption>
      <div>
        limit50x----------------------------------------- Test Suites: 1 failed,
        9 passed, 10 total Tests: 1 failed, 36 passed, 37 total Snapshots: 1
        passed, 1 total Time: 2.897 s Ran all test suites.
      </div>
      <Background>
        <div>
          <Green bold inverse>
            {' '}
            PASS{' '}
          </Green>{' '}
          <Foreground dim>components/ToggleCurrentLightness/</Foreground>
          <Foreground bold>ToggleCurrentLightness.test.tsx</Foreground>
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
      </Background>
    </figure>
  );
};

export default JestSummary;
