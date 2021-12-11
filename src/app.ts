import express from 'express';
import questionsRouter from './routers/questionsRouter';

const app = express();

app.use(express.json());
app.use('/questions', questionsRouter);

export default app;
