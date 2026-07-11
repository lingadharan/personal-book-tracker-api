import { Router } from 'express';
import BookController from '../controller/bookcontroller.js';
import UserController from '../controller/userController.js';

const router = Router();
const bookController = new BookController();
const userController = new UserController();

// Book
router.get('/', (req, res) => bookController.getBookDetails(req, res));
router.post('/add-book', (req, res) =>
  bookController.createBookDetails(req, res)
);
router.put('/update-book', (req, res) =>
  bookController.updateBookDetails(req, res)
);
router.delete('/delete-book', (req, res) =>
  bookController.deleteBookDetails(req, res)
);

// User
router.post('/create-user', (req, res) =>
  userController.createUserDetails(req, res)
);

export default router;
