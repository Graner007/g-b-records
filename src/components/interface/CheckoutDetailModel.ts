import { UserModel } from './UserModel';

export interface CheckoutDetailModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    zipcode: number;
    country: string;
    telephone: string;
    user: UserModel;
}