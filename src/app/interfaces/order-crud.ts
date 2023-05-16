export interface OrderCrud {
    id: number;
    idUser: number;
    idProduct: number;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
}
