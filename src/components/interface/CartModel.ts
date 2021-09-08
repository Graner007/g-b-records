import { UserModel } from './UserModel';
import { CartItemModel } from "./CartItemModel";

export interface CartModel {
    id: number;
    grandTotal: number;
    products: CartItemModel[];
    user: UserModel[];
}