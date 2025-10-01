import React, { useMemo, useState } from "react";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import MusicList from "./music-list";
import { Button } from "../ui/button";

const queryClient = new QueryClient();
const corsProxy = "https://proxy.corsfix.com/?";

export default function MusicInfLoading() {
	const [tracks, setTracks] = useState([]);

	const fetchProjects = async ({ pageParam = 0 }) => {
		const res = await fetch(
			corsProxy +
			"https://api.deezer.com/chart/0/tracks?limit=25&index=" +
			pageParam,
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
			queryFn: fetchProjects,
			initialPageParam: 0,
			getNextPageParam: (_, allPages) => {
				return allPages.length * 25;
			},
		},
		queryClient,
	);

	useMemo(() => {
		let d = [] as any;
		setTracks([]);
		data?.pages.forEach((group, i) => {
			d.push(group.data);
		});
		d = d.flat(Infinity);
		setTracks(d);
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
