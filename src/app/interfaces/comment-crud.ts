export interface CommentCrud {
    id: number;
    idProduct: number;
    idUser: number;
    date: string;
    text: string;
    likes: number;
}
