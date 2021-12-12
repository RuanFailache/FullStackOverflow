import connection from '../database';
import NewUser from '../interfaces/NewUser';

export const checkIfExists = async (inputData: NewUser) => {
  const { name, grade } = inputData;

  const result = await connection.query(`
    SELECT * FROM users WHERE name = $1 AND grade = $2;
  `, [name, grade]);

  return result.rowCount > 0;
};

export const insertNewUser = async (inputData: NewUser, token: string) => {
  const { name, grade } = inputData;

  await connection.query(`
    INSERT INTO users (
      name, grade, token
    ) VALUES (
      $1, $2, $3
    );
  `, [name, grade, token]);

  return token;
};

export const checkToken = async (token: string) => {
  const result = await connection.query(
    'SELECT * FROM users WHERE token = $1',
    [token],
  );

  return result.rowCount > 0;
};
