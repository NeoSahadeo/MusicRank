import { atom } from "nanostores";

export const $search = atom<string>("");
export const $searchState = atom<boolean>(false);

export function setSearch(value: string) {
	$search.set(value);
}

export function setSearchState(v: boolean) {
	$searchState.set(v);
}
