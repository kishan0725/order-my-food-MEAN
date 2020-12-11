import { ICartItem } from './cart-item';

export interface IOrder {
    menu: ICartItem[],
    hotel: String,
    amountPaid: number,
    orderDate: Date
}