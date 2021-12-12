import InvalidBodyError from '../errors/InvalidBodyError';

import NewUser from '../interfaces/NewUser';

import registerUser from '../services/userService';
import * as userModel from '../models/userModel';
import ConflictError from '../errors/ConflictError';

describe('POST /user', () => {
  const inputData: NewUser = {
    name: 'Gustavo Souza',
    grade: 'T200',
  };

  const token = 'testando';

  test('Invalid input data', async () => {
    const result = registerUser({
      ...inputData,
      grade: '',
    });
    await expect(result).rejects.toThrowError(InvalidBodyError);
  });

  test('Registered User', async () => {
    jest.spyOn(userModel, 'checkIfExists')
      .mockImplementationOnce(async () => true);

    const result = registerUser(inputData);
    await expect(result).rejects.toThrowError(ConflictError);
  });

  test('Create user', async () => {
    jest.spyOn(userModel, 'checkIfExists')
      .mockImplementationOnce(async () => false);

    jest.spyOn(userModel, 'insertNewUser')
      .mockImplementationOnce(async () => token);

    const result = await registerUser(inputData);
    expect(result).toEqual(token);
  });
});
