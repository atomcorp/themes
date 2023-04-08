import {colourShemeAndMeta} from '@/types';

const getColorSchemes = async () => {
  const response = await fetch(
    'https://2zrysvpla9.execute-api.eu-west-2.amazonaws.com/prod/themes'
  );
  const colorSchemes = (await response.json()) as colourShemeAndMeta[];
  return colorSchemes;
};

export default getColorSchemes;
