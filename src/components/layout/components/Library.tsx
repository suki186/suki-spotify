import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import { styled } from "@mui/material";

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

  // Current User Playlists 호출
  const { data, isLoading, error } = useGetCurrentUserPlaylists({
    limit: 10,
  });
  console.log("playlist", data);

  if (!token) {
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
      {!data || data?.total === 0 ? (
        // 플레이리스트가 비어있는 경우
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <Playlist playlists={data.items} />
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;
