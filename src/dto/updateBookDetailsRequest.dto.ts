import type { IBook } from '../models/book.js';

export interface IUpdateBookDetailsDTO extends IBook {
  _id: string;
}
