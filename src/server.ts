import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRouter from './routers/bookRouter.js';
import dataBaseConnection from './config/db.js';

dotenv.config()
dataBaseConnection();

const app = express()
const PORT_NUMBER = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.use('/api', bookRouter);

app.listen(PORT_NUMBER, () => {
  console.log(`Listening port ${PORT_NUMBER}`)
})