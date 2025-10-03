import React, { useMemo, useState } from "react";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import MusicList from "./music-list";
import { Button } from "../ui/button";
import { addTracks, resetTracks, $tracks } from "@/stores/tracks";
import { useStore } from "@nanostores/react";
import { $search } from "@/stores/search";

const queryClient = new QueryClient();

export default function MusicInfLoading() {
	const tracks = useStore($tracks);
	const search = useStore($search);

	const fetchTracks = async ({ pageParam = 0 }) => {
		const encodedUrl = encodeURIComponent(
			search
				? `https://api.deezer.com/search?q=${search}&index=${pageParam}`
				: `https://api.deezer.com/chart/0/tracks?limit=26&index=${pageParam}`,
		);

		const res = await fetch(
			`${import.meta.env.BASE_URL}api/proxy?url=${encodedUrl}`,
		);
		return res.json();
	};

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery(
		{
			queryKey: ["chartTracks"],
			queryFn: fetchTracks,
			initialPageParam: 0,
			getNextPageParam: () => {
				return tracks.length;
			},
		},
		queryClient,
	);

	useMemo(() => {
		let d = [] as any;
		resetTracks();
		console.debug(data?.pages);
		data?.pages.forEach((group, i) => {
			d.push(group.data);
		});
		d = d.flat(Infinity);
		addTracks(d);
	}, [data]);

	if (status === "pending") {
		return <p>Loading...</p>;
	} else if (status === "error") {
		return <p>Error: {error.message}</p>;
	}

	// FIXME: ADD types
	return (
		<>
			<MusicList tracks={tracks} />
			<div>
				<Button
					className="mt-5"
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetching}
				>
					{isFetchingNextPage
						? "Loading more..."
						: hasNextPage
							? "Load More"
							: "Nothing more to load"}
				</Button>
			</div>
			<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
		</>
	);
}
