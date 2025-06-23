import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

// 플레이리스트 하나 정보
const useGetPlaylist = (params: GetPlaylistRequest) => {
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => {
      return getPlaylist(params);
    },
    enabled: !!params.playlist_id, // id가 있을 때만 호출
  });
};

export default useGetPlaylist;
