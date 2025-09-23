import axios from "axios";

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
