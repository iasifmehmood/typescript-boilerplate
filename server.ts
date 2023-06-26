require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from './Logger/logger';
import { errorHandler } from './Middleware/errorHandler';
import userRoutes from './Route/userRoutes';
import { logRequestResponse } from './Middleware/logReqRes';
import { incorrectRoute } from './Middleware/incorrectRoute';

const app: Application = express();

// Middleware function to log requests and responses

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logRequestResponse);
app.use('/users', userRoutes);

app.use(incorrectRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
