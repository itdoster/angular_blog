import { Author } from "./author.model";

export class Post {
    id: number;
    name: string;
    text: string;
    date: string;
    author: Author;
    commentsCount: number;
    tag: string
}