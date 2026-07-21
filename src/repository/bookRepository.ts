import type { IUpdateBookDetailsDTO } from '../dto/updateBookDetailsRequest.dto.js';
import Book, { type IBook } from '../models/book.js';

export default class BookRepository {
  async createBooks(books: IBook[]): Promise<IBook[]> {
    return await Book.insertMany(books);
  }

  async getBookById(id: string): Promise<IBook | null> {
    return await Book.findOne({ _id: id });
  }

  async getAllBooks(): Promise<IBook[] | null> {
    return await Book.find();
  }

  async updateBook(updateData: IUpdateBookDetailsDTO): Promise<IBook | null> {
    return await Book.findOneAndUpdate({ _id: updateData._id }, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBook(_id: string): Promise<IBook | null> {
    return await Book.findOneAndDelete({ _id: _id });
  }
}
