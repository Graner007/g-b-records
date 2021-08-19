import { ArtistModel } from "./ArtistModel";

export interface RecordModel {
    id: number;
    name: string;
    artist: ArtistModel;
    genre: string;
    description: string;
    releaseDate: string;
    albumCover: string;
    price: number;
}