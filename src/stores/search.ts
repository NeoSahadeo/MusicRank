import { atom } from "nanostores";

export const $search = atom<string>("");

export function setSearch(value: string) {
	$search.set(value);
}
