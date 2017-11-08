import {Author} from './author.model';

export class Comment {
  id: number;
  author: Author;
  message: string;
  postId: number;
  date: string;
}
