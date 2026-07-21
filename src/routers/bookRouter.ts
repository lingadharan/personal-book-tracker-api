import { Router, type Request, type Response } from 'express';
import BookController from '../controller/bookcontroller.js';
import UserController from '../controller/userController.js';
import {
  googleCallback,
  logoutUser,
  redirectToGoogle,
  verifyUser,
} from '../auth/auth.js';

const router = Router();
const bookController = new BookController();
const userController = new UserController();

// Book
router.get('/get-book', (req: Request, res: Response) =>
  bookController.getBookDetails(req, res)
);
router.post('/add-book', (req: Request, res: Response) =>
  bookController.createBookDetails(req, res)
);
router.put('/update-book', (req: Request, res: Response) =>
  bookController.updateBookDetails(req, res)
);
router.delete('/delete-book', (req: Request, res: Response) =>
  bookController.deleteBookDetails(req, res)
);

router.get('/auth/google', (req: Request, res: Response) =>
  redirectToGoogle(req, res)
);
router.get('/auth/google/callback', (req: Request, res: Response) =>
  googleCallback(req, res)
);

router.get('/auth/me', (req: Request, res: Response) => verifyUser(req, res));

router.post('/auth/logout', (req: Request, res: Response) =>
  logoutUser(req, res)
);

export default router;
