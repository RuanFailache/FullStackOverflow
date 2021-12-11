import InvalidBodyError from '../errors/InvalidBodyError';
import * as questionsService from '../services/questionsService';
import * as questionsModel from '../models/questionsModel';

describe('POST questions/', () => {
  const inputData = {
    question: 'Uki ta contecendo?',
    student: 'Zoru',
    grade: 'T3',
    tags: 'typescript, vida, javascript, java?',
  };

  test('send invalid input data', async () => {
    const promise = questionsService
      .validateAndCreateNewQuestion({
        ...inputData,
        grade: '',
      });

    expect(promise).rejects.toThrowError(InvalidBodyError);
  });

  test('send valid input data', async () => {
    jest.spyOn(questionsModel, 'insertNewQuestion')
      .mockImplementationOnce(async () => 2);

    const promise = await questionsService
      .validateAndCreateNewQuestion(inputData);

    expect(promise).toEqual(2);
  });
});
