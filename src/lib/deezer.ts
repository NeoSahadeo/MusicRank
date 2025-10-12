import type { DeezerAlbum } from "@/types/deezer";
import axios, { type AxiosResponse } from "axios";

enum ChartType {
	tracks,
	albumns,
	artists,
	playlists,
	podcasts,
}

export async function loadChart(type: ChartType) {
	return axios.get(`https://api.deezer.com/chart/0/${type}`);
}

export async function loadAlbum(
	id: number,
): Promise<AxiosResponse<DeezerAlbum>> {
	return axios.get(`https://api.deezer.com/album/${id}`);
}
