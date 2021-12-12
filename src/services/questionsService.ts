/* eslint-disable no-param-reassign */
import InvalidBodyError from '../errors/InvalidBodyError';
import NotFoundError from '../errors/NotFoundError';
import ServerError from '../errors/ServerError';

import AnsweredQuestion from '../interfaces/AnsweredQuestion';
import NewQuestion from '../interfaces/NewQuestion';
import NotAnsweredQuestion from '../interfaces/NotAnsweredQuestion';
import SubmitAnswer from '../interfaces/SubmitAnswer';

import * as questionsModel from '../models/questionsModel';

export const validateAndCreateNewQuestion = async (inputData: NewQuestion): Promise<number> => {
  const { question, student, grade } = inputData;

  const isQuestionValid = question.length > 3;
  const isStudentValid = student.length > 3;
  const isGradeValid = /T([1-9]|[1-9][0-9]){1,2}/.test(grade);

  if (!isQuestionValid || !isStudentValid || !isGradeValid) {
    throw new InvalidBodyError('Invalid input data!');
  }

  return questionsModel.insertNewQuestion(inputData);
};

export const search = async (id: number): Promise<AnsweredQuestion | NotAnsweredQuestion> => {
  const question = await questionsModel.findQuestionById(id);

  if (!question) {
    throw new NotFoundError('Question not found');
  }

  delete question.id;

  if (!question.answered) {
    delete question.answeredAt;
    delete question.answeredBy;
    delete question.answer;
  }

  return question;
};

export const answerQuestion = async (answer: string, user: string, id: number) => {
  const isAnswerValid = answer.length > 3;

  if (!isAnswerValid) {
    throw new InvalidBodyError('Invalid input data!');
  }

  const submitData: SubmitAnswer = {
    answer,
    answeredBy: user,
    answeredAt: new Date(),
  };

  const isAnswered = await questionsModel.updateQuestion(submitData, id);

  if (!isAnswered) {
    throw new ServerError();
  }

  return isAnswered;
};

export const listNotAnsweredQuestions = async () => {
  let questions = await questionsModel.listQuestions();

  questions = questions.map((question) => {
    delete question.answeredBy;
    delete question.answeredAt;
    delete question.answer;
    return question;
  });

  return questions;
};
