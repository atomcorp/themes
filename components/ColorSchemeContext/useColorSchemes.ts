import {
  ColorSchemeStateContext,
  SetColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {useDispatchActions} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

import useDefinedContext from '@/utilities/useDefinedContext';

const useColorSchemes = () => {
  const colorSchemeState = useDefinedContext(ColorSchemeStateContext);
  const setColorSchemeDispatch = useDefinedContext(SetColorSchemeStateContext);

  const {
    setActiveColorScheme,
    setLightness,
    setNextPrevColorScheme,
    setPreviewType,
  } = useDispatchActions(setColorSchemeDispatch);

  return {
    colorSchemeState,
    setActiveColorScheme,
    setLightness,
    setNextPrevColorScheme,
    setPreviewType,
  };
};

export default useColorSchemes;
