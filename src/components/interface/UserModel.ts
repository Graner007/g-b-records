import { CartModel } from './CartModel';
import { OrderModel } from './OrderModel';
import { WishlistModel } from "./WishlistModel";
import { CheckoutDetailModel } from "./CheckoutDetailModel";

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registrationDate: string;
    address: string;
    zipcode: number;
    country: string;
    telephone: string;
    wishList: WishlistModel;
    cart: CartModel;
    orders: OrderModel[];
    checkoutDetails: CheckoutDetailModel[];
}