import { ArtistModel } from "./ArtistModel";
import { GenreModel } from "./GenreModel";
import { WishlistModel } from "./WishlistModel";

export interface RecordModel {
    id: number;
    name: string;
    artist: ArtistModel;
    genre: GenreModel[];
    description: string;
    releaseDate: string;
    albumCover: string;
    price: number;
    wishlist: WishlistModel[];
    isInWishlist: boolean;
}