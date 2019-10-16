export class Advert {
    email: string;
    title: string;
    description: string;
    rooms?: string;
    images?: string[];
    address?: {
        firstLine: string,
        secondLine: string,
        city: string,
        country: string
    };
    price: string;
    phoneNumber: string
}