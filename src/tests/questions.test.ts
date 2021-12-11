import InvalidBodyError from '../errors/InvalidBodyError';
import * as questionsService from '../services/questionsService';
import * as questionsModel from '../models/questionsModel';
import NewQuestion from '../interfaces/NewQuestion';
import NotAnsweredQuestion from '../interfaces/NotAnsweredQuestion';
import AnsweredQuestion from '../interfaces/AnsweredQuestion';
import NotFoundError from '../errors/NotFoundError';

const ID_TEST = 2;

describe('POST questions/', () => {
  const inputData: NewQuestion = {
    question: 'Uki ta contecendo?',
    student: 'Zoru',
    grade: 'T3',
    tags: 'typescript, vida, javascript, java?',
  };

  test('send invalid input data', async () => {
    const result = questionsService
      .validateAndCreateNewQuestion({
        ...inputData,
        grade: '',
      });

    expect(result).rejects.toThrowError(InvalidBodyError);
  });

  test('send valid input data', async () => {
    jest.spyOn(questionsModel, 'insertNewQuestion')
      .mockImplementationOnce(async () => ID_TEST);

    const result = await questionsService
      .validateAndCreateNewQuestion(inputData);

    expect(result).toEqual(ID_TEST);
  });
});

describe('GET /questions/:id', () => {
  const notAnsweredQuestion: NotAnsweredQuestion = {
    question: 'Uki ta contecendo?',
    student: 'Zoru',
    grade: 'T3',
    tags: 'typescript, vida, javascript, java?',
    answered: false,
    submitAt: '2021-01-01 10:12',
  };

  const answeredQuestion: AnsweredQuestion = {
    question: 'Uki ta contecendo?',
    student: 'Zoru',
    grade: 'T3',
    tags: 'typescript, vida, javascript, java?',
    answered: true,
    submitAt: '2021-01-01 10:12',
    answeredAt: '2021-01-01 10:30',
    answeredBy: 'Vegeta',
    answer: 'É mais de 8 miiiil!',
  };

  test('Not found question', async () => {
    jest.spyOn(questionsModel, 'findQuestionById')
      .mockImplementationOnce(async () => null);

    const result = questionsService.search(ID_TEST);

    expect(result).rejects.toThrowError(NotFoundError);
  });

  test('Answered question', async () => {
    jest.spyOn(questionsModel, 'findQuestionById')
      .mockImplementationOnce(async () => ({
        ...answeredQuestion,
        id: ID_TEST,
      }));

    const result = await questionsService.search(ID_TEST);

    expect(result).toEqual(answeredQuestion);
  });

  test('Not answered question', async () => {
    jest.spyOn(questionsModel, 'findQuestionById')
      .mockImplementationOnce(async () => ({
        ...notAnsweredQuestion,
        id: ID_TEST,
      }));

    const result = await questionsService.search(ID_TEST);

    expect(result).toEqual(notAnsweredQuestion);
  });
});
