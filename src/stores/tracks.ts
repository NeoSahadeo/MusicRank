// tracks.ts
// stores the current tracks viewable in the
// current page. This is used with the search
// bar to allow tracks to be refreshed without
// switching / refreshing the page

import { atom } from "nanostores";

// TODO: Switch type any to type of track
export const $tracks = atom<any[]>([]);

export function addTracks(tracks: any) {
	$tracks.set([...$tracks.get(), ...tracks]);
}

export function resetTracks() {
	$tracks.set([]);
}
