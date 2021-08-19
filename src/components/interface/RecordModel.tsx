import { ArtistModel } from "./ArtistModel";
import { GenreModel } from "./GenreModel";

export interface RecordModel {
    id: number;
    name: string;
    artist: ArtistModel;
    genre: GenreModel[];
    description: string;
    releaseDate: string;
    albumCover: string;
    price: number;
}