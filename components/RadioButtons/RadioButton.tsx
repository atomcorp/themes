import * as RadioGroup from '@radix-ui/react-radio-group';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

import css from './RadioButton.module.css';

type Props = {
  children: string;
  value: string;
  disabled?: boolean;
  id?: string;
};

const RadioButton = (props: Props) => {
  const id = props.id ?? props.value;
  return (
    <span className={css.container} key={props.value}>
      <RadioGroup.Item
        className={css.button}
        disabled={props.disabled}
        value={props.value}
        id={id}
      >
        {props.children}
      </RadioGroup.Item>
      <VisuallyHidden>
        <label htmlFor={id}>{props.children}</label>
      </VisuallyHidden>
    </span>
  );
};

export default RadioButton;
