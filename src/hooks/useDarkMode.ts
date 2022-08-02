import { useAppDispatch, useAppSelector } from "state";
import { setDarkMode } from "state/theme/actions";

export function useDarkMode() {
  const darkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return { darkMode, toggleDarkMode };
}
