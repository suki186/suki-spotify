import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistRequest) => {
  // 데이터를 무한으로 불러옴(무한스크롤 대비)
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0, // 초기값
    getNextPageParam: (lastPage) => {
      // 다음페이지가 있다면 offset return
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
