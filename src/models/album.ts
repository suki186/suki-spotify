import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Images, Restriction } from "./commonType";

// NewReleases 정보
export interface GetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbum>;
}

// 앨범 정보
export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restriction;
  type: string;
  uri: string;
  artists: Artist[];
}
