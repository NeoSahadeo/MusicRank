import React, { useMemo, useState } from "react";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import MusicList from "./music-list";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import { $search } from "@/stores/search";

function MusicInfLoading() {
  const [tracks, setTracks] = useState([]);
  const search = useStore($search);

  const fetchTracks = async ({
    search,
    pageParam = 0,
  }: {
    search: string;
    pageParam: number;
  }) => {
    const encodedUrl = encodeURIComponent(
      search
        ? `https://api.deezer.com/search?q=${search}&index=${pageParam}`
        : `https://api.deezer.com/chart/0/tracks?limit=26&index=${pageParam}`,
    );

    const res = await fetch(
      `${import.meta.env.BASE_URL}api/proxy?url=${encodedUrl}`,
    );
    const d = await res.json();
    console.log(d);
    return d;
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

  useMemo(() => {
    console.log(data);
    let d = [] as any;
    setTracks([]);
    console.debug(data?.pages);
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
import { QueryClientProvider } from "@tanstack/react-query";

export default function MusicInfLoadingWrapper() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MusicInfLoading />
    </QueryClientProvider>
  );
}
