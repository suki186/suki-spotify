import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentailToken from "./useClientCredentailToken";

// NewReleases 가져오기
const useGetNewReleases = () => {
  // 토큰 가져오기
  const clientCredentialToken = useClientCredentailToken();

  return useQuery({
    queryKey: ["new-releases"], // 고유 key
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("clientCredentialToken이 undefined");
      }
      return getNewReleases(clientCredentialToken); // albumApi.ts
    },
  });
};

export default useGetNewReleases;
