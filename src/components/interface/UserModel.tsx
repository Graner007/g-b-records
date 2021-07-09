import { RecordModel } from './RecordModel';

export interface UserModel {
    id: number;
    cart: RecordModel[];
    email: string;
    password: string;
    registrationDate: string;
}