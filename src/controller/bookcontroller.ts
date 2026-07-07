import type { Request, Response } from 'express';
import Book from '../models/book.js';
import mongoose from 'mongoose';

export const createBookDetails = async (req: Request, res: Response) => {
  try {
    const result = await Book.insertMany(req.body.books)
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error
    })
  }
}

export const getBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (id) {
      const book = await Book.findOne({ id: Number(id) });

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: book,
      });
    }
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error
    });
  }
}

export const updateBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    console.log(id)
    const bookId = Number(id);
    console.log(bookId)
    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Book id must be a number",
      });
    }

    const updatedBook = await Book.findOneAndUpdate(
      { id: bookId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};

export const deleteBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const bookId = Number(id);

    if (Number.isNaN(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Book id must be a number",
      });
    }

    const deletedBook = await Book.findOneAndDelete({ id: bookId });

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};

