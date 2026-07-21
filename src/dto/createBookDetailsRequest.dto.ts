import type { IBook } from '../models/book.js';

export default interface ICreateBookDetailsRequest {
  books: IBook[];
}
