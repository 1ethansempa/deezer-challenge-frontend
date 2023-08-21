type Artist = {
  id: number;
  name: string;
  picture: string;
  picture_big: string;
  nb_fan: number;
};

type ExtendedArtist = Artist & {
  nb_fan: number;
  nb_albums: number;
};

export { ExtendedArtist, Artist };
