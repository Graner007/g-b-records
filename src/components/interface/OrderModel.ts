import { UserModel } from "./UserModel";
import { CartItemModel } from "./CartItemModel";

export interface OrderModel {
    id: number;
    user: UserModel;
    orderDate: string;
    address: string;
    products: CartItemModel[];
    payment: number;
    productNumbers: number;
}