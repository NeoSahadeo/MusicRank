// tracks.ts
// stores the current tracks viewable in the
// current page. This is used with the search
// bar to allow tracks to be refreshed without
// switching / refreshing the page
//

import { actions } from "astro:actions";
import type { DeezerTrack } from "@/types/deezer";
import { atom } from "nanostores";
import type { RankingsTable } from "@/types/supabase";

export const $tracks = atom<DeezerTrack[]>([]);

export async function setTracks(tracks: DeezerTrack[]) {
	const { data } = (await actions.rankactions.getAllRankings()) as {
		data: RankingsTable[];
	};
	for (const value in data) {
		tracks.filter((e) => {
			const match = e.id === data[value].song_id;
			if (match) {
				e.review = data[value].review;
				e.rating = data[value].rating;
			}
		});
	}
	$tracks.set([]);
	$tracks.set(tracks);
}

export function addTracks(tracks: any) {
	$tracks.set([...$tracks.get(), ...tracks]);
}

export function resetTracks() {
	$tracks.set([]);
}
