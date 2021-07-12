import { CartItemModel } from './CartItemModel';

export interface UserModel {
    id: number;
    cart: CartItemModel[];
    email: string;
    password: string;
    registrationDate: string;
}