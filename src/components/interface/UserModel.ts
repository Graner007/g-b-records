import { CartModel } from './CartModel';
import { WishlistModel } from "./WishlistModel";

export interface UserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    registrationDate: string;
    address: string;
    zipcode: number;
    country: string;
    phoneNumber: string;
    wishList: WishlistModel;
    cart: CartModel;
}