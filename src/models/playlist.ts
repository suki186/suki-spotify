import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Images, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

// key값이 없어서 interface 안됨(객체)
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Images[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  url?: string;
}
