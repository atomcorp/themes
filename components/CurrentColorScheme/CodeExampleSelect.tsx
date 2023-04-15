'use client';

import {
  Root as TabRoot,
  List as TabList,
  Trigger as TabTrigger,
  Content as TabContent,
} from '@radix-ui/react-tabs';

import ChalkExample from '@/components/CurrentColorScheme/CodeExamples/ChalkExample';
import JestSummary from '@/components/CurrentColorScheme/CodeExamples/JestSummary';

const examplesEnum = [
  {
    id: 'jest',
    label: 'Jest',
    component: JestSummary,
  },
  {
    id: 'chalk',
    label: 'Chalk',
    component: ChalkExample,
  },
] as const;

const CodeExampleSelect = () => {
  return (
    <TabRoot defaultValue={examplesEnum[0].id}>
      <TabList aria-label="Code example tabs">
        {examplesEnum.map(({id, label}) => (
          <TabTrigger key={id} value={id}>
            {label}
          </TabTrigger>
        ))}
      </TabList>
      {examplesEnum.map(({id, component: Component}) => (
        <TabContent key={id} value={id}>
          <Component />
        </TabContent>
      ))}
    </TabRoot>
  );
};

export default CodeExampleSelect;
