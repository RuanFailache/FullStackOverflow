import InvalidBodyError from '../errors/InvalidBodyError';
import NotFoundError from '../errors/NotFoundError';
import AnsweredQuestion from '../interfaces/AnsweredQuestion';
import NewQuestion from '../interfaces/NewQuestion';
import NotAnsweredQuestion from '../interfaces/NotAnsweredQuestion';
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

  return question;
};
