import { atom } from "nanostores";

type Theme = "dark" | "light" | "system";

export const $theme = atom<Theme>("light");

export function toggleTheme() {
	setTheme($theme.value === "dark" ? "light" : "dark");
}

export function setTheme(theme: Theme) {
	$theme.set(theme);
}
