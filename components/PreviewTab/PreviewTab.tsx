'use client';

import {
  Root as TabRoot,
  List as TabList,
  Trigger as TabTrigger,
  Content as TabContent,
} from '@radix-ui/react-tabs';

import ChalkPreview from '@/components/ColorSchemePreviews/ChalkPreview';
import JestPreview from '@/components/ColorSchemePreviews/JestPreview';

const examplesEnum = [
  {
    id: 'jest',
    label: 'Jest',
    component: JestPreview,
  },
  {
    id: 'chalk',
    label: 'Chalk',
    component: ChalkPreview,
  },
] as const;

const PreviewTab = () => {
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

export default PreviewTab;
