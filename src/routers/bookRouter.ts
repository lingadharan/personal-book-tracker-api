import { Router } from 'express'
import { createBookDetails, deleteBookDetails, getBookDetails, updateBookDetails } from '../controller/bookcontroller.js';

const bookRouter = Router();

bookRouter.get('/', getBookDetails)
bookRouter.post('/add-book', createBookDetails);
bookRouter.put('/update-book', updateBookDetails);
bookRouter.delete('/delete-book', deleteBookDetails);

export default bookRouter;
