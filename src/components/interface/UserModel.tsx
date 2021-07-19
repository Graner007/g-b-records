import { CartItemModel } from './CartItemModel';

export interface UserModel {
    id: number;
    cart: CartItemModel[];
    name: string;
    email: string;
    password: string;
    registrationDate: string;
    address: string;
    zipcode: number;
    country: string;
    phoneNumber: string;
}