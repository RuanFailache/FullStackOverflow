import connection from '../database';
import NewQuestion from '../interfaces/NewQuestion';
import SubmitAnswer from '../interfaces/SubmitAnswer';

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

export const findQuestionById = async (id: number) => {
  const result = await connection.query(`
    SELECT * FROM questions WHERE id = $1;
  `, [id]);

  return result.rows[0] || null;
};

export const updateQuestion = async (submitData: SubmitAnswer, id: number) => {
  const { answer, answeredAt, answeredBy } = submitData;

  const result = await connection.query(`
    UPDATE questions SET
      answer = $1,
      "answeredAt" = $2,
      "answeredBy" = $3,
      answered = true
    WHERE id = $4 RETURNING *;
  `, [answer, answeredAt, answeredBy, id]);

  return result.rowCount > 0;
};

export const listQuestions = async () => {
  const result = await connection.query(
    'SELECT * FROM questions WHERE answered = false',
  );

  return result.rows;
};
