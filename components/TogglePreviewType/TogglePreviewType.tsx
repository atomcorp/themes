'use client';

import useColorSchemes from '@/components//ColorSchemeContext/useColorSchemes';
import RadioButtons from '@/components/RadioButtons/RadioButtons';
import RadioButton from '@/components/RadioButtons/RadioButton';

const TogglePreviewType = () => {
  const {
    colorSchemeState: {previewType},
    setPreviewType,
  } = useColorSchemes();

  return (
    <RadioButtons
      label="Toggle Terminal or Chalk previews"
      value={previewType}
      handleChange={(value: string) => {
        if (value === 'terminal' || value === 'chalk') {
          setPreviewType(value);
        }
      }}
    >
      <RadioButton value="terminal">Terminal</RadioButton>
      <RadioButton value="chalk">Chalk</RadioButton>
    </RadioButtons>
  );
};

export default TogglePreviewType;
