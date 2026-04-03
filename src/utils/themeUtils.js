import { THEMES, THEME_STORAGE_KEY } from '../constants/themeConstants';

export const initializeTheme = () => {
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || THEMES.DARK;
  document.documentElement.setAttribute('data-theme', currentTheme);
  return currentTheme;
};

export const toggleTheme = (currentTheme) => {
  const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  return newTheme;
};
