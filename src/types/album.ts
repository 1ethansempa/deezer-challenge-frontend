type Album = {
  id: number;
  title: string;
  cover: string;
  cover_medium: string;
  cover_big: string;
};

type ExtendedAlbum = Album & {
  release_date: string;
};

export { Album, ExtendedAlbum };
