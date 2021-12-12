import express from 'express';
import errorMiddleware from './middlewares/error';
import questionsRouter from './routers/questionsRouter';
import userRouter from './routers/userRouter';

const app = express();

app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);

export default app;
