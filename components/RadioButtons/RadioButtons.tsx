import * as RadioGroup from '@radix-ui/react-radio-group';

type Props = {
  label: string;
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
