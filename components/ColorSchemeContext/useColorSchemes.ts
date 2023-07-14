import {
  ColorSchemeStateContext,
  SetColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {useDispatchActions} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

import useDefinedContext from '@/utilities/useDefinedContext';

const useColorSchemes = () => {
  const colorSchemeState = useDefinedContext(ColorSchemeStateContext);
  const setColorSchemeDispatch = useDefinedContext(SetColorSchemeStateContext);

  const {setCurrentColorScheme, setCurrentLightness, setNextPrevColorScheme} =
    useDispatchActions(setColorSchemeDispatch);

  return {
    colorSchemeState,
    setCurrentColorScheme,
    setCurrentLightness,
    setNextPrevColorScheme,
  };
};

export default useColorSchemes;
