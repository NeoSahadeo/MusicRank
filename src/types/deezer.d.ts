import type { RankingsTable } from "./supabase";
export type DeezerTrack = {
	id: number;
	readable: boolean;
	title: string;
	title_short: string;
	title_version: string;
	link: string;
	duration: number;
	rank: number;
	explicit_lyrics: boolean;
	explicit_content_lyrics: number;
	explicit_content_cover: number;
	preview: string;
	md5_image: string;
	artist: {
		id: number;
		name: string;
		link: string;
		picture: string;
		picture_small: string;
		picture_medium: string;
		picture_big: string;
		picture_xl: string;
		tracklist: string;
		type: string;
	};
	album: {
		id: number;
		title: string;
		cover: string;
		cover_small: string;
		cover_medium: string;
		cover_big: string;
		cover_xl: string;
		md5_image: string;
		tracklist: string;
		type: string;
	};
	type: string;
} & RankingsTable;

type DeezerAlbum = {
	id: number;
	title: string;
	upc: string;
	link: string;
	share: string;
	cover: string;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	md5_image: string;
	genre_id: number;
	genres: {
		data: Array<{
			id: number;
			name: string;
			picture: string;
			type: string;
		}>;
	};
	label: string;
	nb_tracks: number;
	duration: number;
	fans: number;
	release_date: string;
	record_type: string;
	available: boolean;
	tracklist: string;
	explicit_lyrics: boolean;
	explicit_content_lyrics: number;
	explicit_content_cover: number;
	contributors: Array<{
		id: number;
		name: string;
		link: string;
		share: string;
		picture: string;
		picture_small: string;
		picture_medium: string;
		picture_big: string;
		picture_xl: string;
		radio: boolean;
		tracklist: string;
		type: string;
		role: string;
	}>;
	artist: {
		id: number;
		name: string;
		picture: string;
		picture_small: string;
		picture_medium: string;
		picture_big: string;
		picture_xl: string;
		tracklist: string;
		type: string;
	};
	type: string;
	tracks: {
		data: Array<DeezerTrack>;
	};
};
