import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../hooks/useGetPlaylist";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });

  if (id === undefined) {
    return <Navigate to="/" />; // url에 id 없을 경우
  }
  console.log("playlist", playlist);

  return <div>PlaylistDetailPage</div>;
};

export default PlaylistDetailPage;
