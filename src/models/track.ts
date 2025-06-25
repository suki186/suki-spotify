import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { Copyright, ExternalUrls, Images, Restriction } from "./commonType";

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restriction;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_url: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: "episode";
  uri: string;
  restrictions?: Restriction;
  show: Show;
}
export type SimplifiedEpisode = Omit<Episode, "show">;

export interface Show {
  available_markets: string[];
  copyrights: Copyright;
  description: string;
  html_description: string;
  explicit: boolean;
  external_url: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface SimplifiedAudioBook {
  author: { name: string }[];
  available_markets: string[];
  copyrights: Copyright;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}
