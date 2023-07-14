import * as RadioGroup from '@radix-ui/react-radio-group';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

type Props = {
  children: string;
  value: string;
  disabled?: boolean;
  id?: string;
};

const RadioButton = (props: Props) => {
  const id = props.id ?? props.value;
  return (
    <span key={props.value}>
      <RadioGroup.Item disabled={props.disabled} value={props.value} id={id}>
        {props.children}
      </RadioGroup.Item>
      <VisuallyHidden>
        <label htmlFor={id}>{props.children}</label>
      </VisuallyHidden>
    </span>
  );
};

export default RadioButton;
