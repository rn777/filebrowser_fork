import { theme } from "./constants";

const themeStorageKey = "unycloudTheme";

const isUserTheme = (value: string | null): value is UserTheme => {
  return value === "light" || value === "dark" || value === "";
};

export const getTheme = (): UserTheme => {
  const htmlTheme = document.documentElement.className as UserTheme;
  if (htmlTheme) return htmlTheme;

  const savedTheme = window.localStorage.getItem(themeStorageKey);
  if (isUserTheme(savedTheme) && savedTheme) return savedTheme;

  return theme;
};

export const setTheme = (theme: UserTheme, persist = false) => {
  const html = document.documentElement;
  if (!theme) {
    html.className = getMediaPreference();
  } else {
    html.className = theme;
  }

  if (persist) {
    window.localStorage.setItem(themeStorageKey, html.className);
  }
};

export const toggleTheme = (): void => {
  const activeTheme = getTheme();
  if (activeTheme === "light") {
    setTheme("dark", true);
  } else {
    setTheme("light", true);
  }
};

export const getMediaPreference = (): UserTheme => {
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    return "dark";
  } else {
    return "light";
  }
};
