import { Album } from "./album";
import { Artist } from "./artist";

type Track = {
  id: number;
  readable: boolean;
  title: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  artist: Artist;
  album: Album;
};

type Contributor = {
  id: number;
  name: string;
  picture: string;
  picture_big: string;
};

type ExtendedTrack = Track & {
  contributors: Contributor[];
};

export { Track, ExtendedTrack };
