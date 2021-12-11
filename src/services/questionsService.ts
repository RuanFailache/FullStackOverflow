import InvalidBodyError from '../errors/InvalidBodyError';
import NewQuestion from '../interfaces/NewQuestion';
import * as questionsModel from '../models/questionsModel';

export const validateAndCreateNewQuestion = async (inputData: NewQuestion): Promise<number> => {
  const { question, student, grade } = inputData;

  const isQuestionValid = question.length > 3;
  const isStudentValid = student.length > 3;
  const isGradeValid = /T([1-9]|[1-9][0-9]){1,2}/.test(grade);

  if (!isQuestionValid || !isStudentValid || !isGradeValid) {
    console.log({
      isGradeValid,
      isQuestionValid,
      isStudentValid,
    });
    throw new InvalidBodyError('Invalid input data!');
  }

  return questionsModel.insertNewQuestion(inputData);
};

export const test = '';
