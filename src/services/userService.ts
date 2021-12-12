import { v4 as uuid } from 'uuid';
import NewUser from '../interfaces/NewUser';
import * as userModel from '../models/userModel';

const registerUser = async (inputData: NewUser) => {
  const { name, grade } = inputData;

  const isGradeValid = /T([1-9]|[1-9][0-9]){1,2}/.test(grade);
  const isNameValid = name.length > 3;

  if (!isGradeValid || !isNameValid) {
    throw new Error('Deu ruim...');
  }

  const userExists = await userModel.checkIfExists(inputData);

  if (userExists) {
    throw new Error('Deu ruim...');
  }

  const token = uuid();

  await userModel.insertNewUser(inputData, token);

  return token;
};

export default registerUser;
