import type { IUpdateBookDetailsDTO } from '../dto/updateBookDetailsRequest.dto.js';
import { NotFoundError } from '../error/error.js';
import type { IBook } from '../models/book.js';
import BookRepository from '../repository/bookRepository.js';

export default class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBookDetails(books: IBook[]) {
    return await this.bookRepository.createBooks(books);
  }

  async getBookDetails(_id?: string): Promise<IBook | IBook[]> {
    if (_id) {
      const getBookByIdRepository = await this.bookRepository.getBookById(_id);
      if (!getBookByIdRepository) {
        throw new NotFoundError('Book not found');
      }
      return getBookByIdRepository;
    }
    const getAllBooksRepository = await this.bookRepository.getAllBooks();
    if (
      !getAllBooksRepository ||
      (getAllBooksRepository && getAllBooksRepository.length === 0)
    ) {
      throw new NotFoundError('Book not found');
    }
    return getAllBooksRepository;
  }

  async updateBookDetails(updateData: IUpdateBookDetailsDTO): Promise<IBook> {
    const result = await this.bookRepository.updateBook(updateData);
    if (!result) {
      throw new NotFoundError('Book not found');
    }
    return result;
  }

  async deleteBookDetails(_id: string): Promise<IBook> {
    const result = await this.bookRepository.deleteBook(_id);
    if (!result) {
      throw new NotFoundError('Book not found');
    }
    return result;
  }
}
