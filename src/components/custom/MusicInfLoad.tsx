import { useEffect, useMemo, useState } from "react";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MusicList from "./music-list";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import { $search, setSearch, setSearchState } from "@/stores/search";
import { $tracks, setTracks, resetTracks } from "@/stores/tracks";

function MusicInfLoading() {
  const search = useStore($search);
  const tracks = useStore($tracks);

  const fetchTracks = async ({
    search,
    pageParam = 0,
  }: {
    search: string;
    pageParam: number;
  }) => {
    if (search) {
      setSearchState(true);
    }

    const encodedUrl = encodeURIComponent(
      search
        ? `https://api.deezer.com/search?q=${search}&index=${pageParam}`
        : `https://api.deezer.com/chart/0/tracks?limit=26&index=${pageParam}`,
    );

    const res = await fetch(
      `${import.meta.env.BASE_URL}api/proxy?url=${encodedUrl}`,
    );
    setSearchState(false);
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
    queryKey: ["chartTracks", search],
    queryFn: ({ pageParam = 0 }) => {
      return fetchTracks({ search: search, pageParam: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: () => {
      return tracks.length;
    },
  });

  useEffect(() => {
    let d = [] as any;
    data?.pages.forEach((group: any, i) => {
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
export default function MusicInfLoadingWrapper() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MusicInfLoading />
    </QueryClientProvider>
  );
}
