import type { DeezerAlbum } from "@/types/deezer";
import { useEffect, useMemo, useState } from "react";
import MusicCard from "./music-card";
import MusicList from "./music-list";

export default function AlbumView({ data }: { data: DeezerAlbum }) {
	return (
		<>
			<img src={data.cover_medium} />
			<MusicList tracks={data.tracks.data} />
		</>
	);
}
