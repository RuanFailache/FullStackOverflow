import connection from '../database';
import NewQuestion from '../interfaces/NewQuestion';

export const insertNewQuestion = async (questionData: NewQuestion): Promise<number> => {
  const {
    question, student, grade, tags,
  } = questionData;

  const result = await connection.query(`
    INSERT INTO questions(
      question, student, grade, tags
    ) VALUES (
      $1, $2, $3, $4
    ) RETURNING *;
  `, [question, student, grade, tags]);

  return result.rows[0].id;
};

export const test = '';
