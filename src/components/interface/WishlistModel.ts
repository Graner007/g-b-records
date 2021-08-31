import { UserModel } from './UserModel';
import { RecordModel } from "./RecordModel";

export interface WishlistModel {
    id: number;
    products: RecordModel[];
    user: UserModel[];
}