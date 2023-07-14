import * as RadioGroup from '@radix-ui/react-radio-group';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

const label = 'aria lable';

type Item = {
  name: string;
  value: string;
  id?: string;
};

type Props = {
  label: string;
  // items: Item[];
  handleChange?: (value: string) => void;
  value: string;
  children: React.ReactNode[];
};

const RadioButtons = (props: Props) => {
  return (
    <form>
      <RadioGroup.Root
        onValueChange={props.handleChange}
        value={props.value}
        aria-label={props.label}
      >
        {props.children}
      </RadioGroup.Root>
    </form>
  );
};

export default RadioButtons;
