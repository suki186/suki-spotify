import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import { CreatePlaylistRequest } from "../models/playlist";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";

// 플레이리스트 생성
const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();

  // post이므로 useMutation
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (user && user.id) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("user is not defined"));
    },
    onSuccess: () => {
      // 플레이리스트 새로고침
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("성공");
    },
  });
};

export default useCreatePlaylist;
