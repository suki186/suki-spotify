import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";

const Library = () => {
  // Current User Playlists 호출
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log("playlist", data);

  return (
    <div>
      {/* 플레이리스트가 비어있는 경우 */}
      <EmptyPlaylist />
    </div>
  );
};

export default Library;
