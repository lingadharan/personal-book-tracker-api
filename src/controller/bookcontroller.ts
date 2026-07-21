import type { Request, Response } from 'express';
import BookService from '../service/bookService.js';
import type IGetBookDetailsRequest from '../dto/getBookDetailsRequest.dto.js';
import type { IBook } from '../models/book.js';
import { NotFoundError } from '../error/error.js';
import type ICreateBookDetailsRequest from '../dto/createBookDetailsRequest.dto.js';
import type { IUpdateBookDetailsDTO } from '../dto/updateBookDetailsRequest.dto.js';
import mongoose from 'mongoose';

function validateBook(book: IBook, isUpdate = false): string | null {
  if (!book || typeof book !== 'object') {
    return 'Book data must be an object';
  }

  // if (isUpdate) {
  //   if (!book._id) {
  //     return 'Book _id is required for update';
  //   }
  // } else {
  //   if (book._id) {
  //     return 'Book _id should not be present when creating a book';
  //   }
  // }

  // Required fields: Must be present on creation. If present on update, must be non-empty string.
  if (!isUpdate || book.title !== undefined) {
    if (
      !book.title ||
      typeof book.title !== 'string' ||
      book.title.trim() === ''
    ) {
      return 'title is required and must be a non-empty string';
    }
  }

  if (!isUpdate || book.author !== undefined) {
    if (
      !book.author ||
      typeof book.author !== 'string' ||
      book.author.trim() === ''
    ) {
      return 'author is required and must be a non-empty string';
    }
  }

  const validCategories = ['reading', 'read', 'interest', 'favourite'];
  if (!isUpdate || book.category !== undefined) {
    if (!book.category || !validCategories.includes(book.category)) {
      return `category is required and must be one of: ${validCategories.join(', ')}`;
    }
  }

  // Optional fields validation
  if (book.currentPage !== undefined && book.currentPage !== null) {
    if (typeof book.currentPage !== 'number') {
      return 'currentPage must be a number';
    }
  }

  if (
    book.durationToComplete !== undefined &&
    book.durationToComplete !== null
  ) {
    if (typeof book.durationToComplete !== 'string') {
      return 'durationToComplete must be a string';
    }
  }

  if (book.suggestedBy !== undefined && book.suggestedBy !== null) {
    if (typeof book.suggestedBy !== 'string') {
      return 'suggestedBy must be a string';
    }
  }

  const validReadStatuses = ['completed', 'need-to-plan', 'in-progress'];
  if (book.readStatus !== undefined && book.readStatus !== null) {
    if (!validReadStatuses.includes(book.readStatus)) {
      return `readStatus must be one of: ${validReadStatuses.join(', ')}`;
    }
  }

  if (book.notes !== undefined && book.notes !== null) {
    if (typeof book.notes !== 'string') {
      return 'notes must be a string';
    }
  }

  return null;
}

export default class BookController {
  async createBookDetails(req: Request, res: Response): Promise<Response> {
    const { books } = req.body as ICreateBookDetailsRequest;

    if (!books || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing books array details.',
      });
    }

    for (const book of books) {
      const validationError = validateBook(book, false);
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${validationError}`,
        });
      }
    }

    try {
      const service = new BookService();
      const result = await service.createBookDetails(books);
      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    }
  }

  async getBookDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.query as IGetBookDetailsRequest;
      const service = new BookService();

      if (_id) {
        const book = (await service.getBookDetails(_id)) as IBook;
        return res.status(200).json({
          success: true,
          data: book,
        });
      }

      const books = (await service.getBookDetails()) as IBook[];
      return res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async updateBookDetails(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body as IUpdateBookDetailsDTO;
      if (!mongoose.isValidObjectId(body._id)) {
        return res.status(400).json({
          success: false,
          message: 'Book _id is required',
        });
      }

      const validationError = validateBook(body as IBook, true);
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${validationError}`,
        });
      }

      if (!body._id) {
        return res.status(400).json({
          success: false,
          message: `Validation failed: _id is required.`,
        });
      }

      const service = new BookService();
      const updatedBook = await service.updateBookDetails(body);

      return res.status(200).json({
        success: true,
        data: updatedBook,
      });
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }

  async deleteBookDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.query;

      if (!_id || !mongoose.isValidObjectId(_id)) {
        return res.status(400).json({
          success: false,
          message: 'Book _id required',
        });
      }

      const service = new BookService();
      const deletedBook = await service.deleteBookDetails(_id as string);

      return res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook,
      });
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}
