import { useEffect, useMemo, useState } from "react";
import {
	useInfiniteQuery,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import MusicList from "./music-list";
import { Button } from "../ui/button";
import type { RankingsTable } from "@/types/supabase";

function ProfileTracksInf() {
	const [tracks, setTracks] = useState<RankingsTable[]>([]);
	const fetchTracks = async ({ pageParam = 0 }: { pageParam: number }) => {
		// const encodedUrl = encodeURIComponent(
		// 	search
		// 		? `https://api.deezer.com/search?q=${search}&index=${pageParam}`
		// 		: `https://api.deezer.com/chart/0/tracks?limit=26&index=${pageParam}`,
		// );

		const res = await fetch(`${import.meta.env.BASE_URL}api/supabase/rankings`);
		return await res.json();
	};

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["chartTracks"],
		queryFn: ({ pageParam = 0 }) => {
			return fetchTracks({ pageParam: pageParam });
		},
		initialPageParam: 0,
		getNextPageParam: () => {
			return tracks.length;
		},
	});

	useEffect(() => {
		let d: RankingsTable[] = [];
		data?.pages.forEach((group: any, i) => {
			d.push(group);
		});
		d = d.flat(Infinity);
		setTracks(d);
	}, [data]);

	if (status === "pending") {
		return <p>Loading...</p>;
	} else if (status === "error") {
		return <p>Error: {error.message}</p>;
	}

	return (
		<>
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

export default function ProfileTracksInfWrapper() {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ProfileTracksInf />
		</QueryClientProvider>
	);
}
