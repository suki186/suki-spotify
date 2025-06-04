import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetNewReleasesResponse } from "../models/album";

// NewReleases 가져오기
export const getNewReleases = async (
  clientCredentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error("getNewReleases 실패.. " + e);
  }
};
