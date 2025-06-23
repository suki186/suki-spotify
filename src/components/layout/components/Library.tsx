import React, { useEffect } from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import { styled } from "@mui/material";
import { useInView } from "react-intersection-observer";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

const Library = () => {
  const token = localStorage.getItem("access_token");
  const { ref, inView } = useInView();

  // Current User Playlists 호출
  const {
    data,
    isLoading,
    hasNextPage, // 다음페이지가 있는가
    isFetchingNextPage, // 다음페이지를 부르는 중인가
    fetchNextPage,
    error,
  } = useGetCurrentUserPlaylists({
    limit: 10,
  });
  //console.log("playlist", data);

  useEffect(() => {
    // inView가 true이면 다음페이지(fetchNextPage) 가져오기
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!token) {
    // 로그인 안된 경우
    return <EmptyPlaylist />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        // 플레이리스트가 비어있는 경우
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          {/* 이 영역이 보이면 데이터 가져오기 */}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;
