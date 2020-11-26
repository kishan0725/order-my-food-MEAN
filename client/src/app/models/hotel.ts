import { IMenu } from './menu';

export interface IHotel {
    id: string,
    name: string,
    address: string,
    cuisines: string,
    rating: string,
    reviews: string,
    feature_image: string,
    thumbnail_image: string,
    menu: IMenu[]
}