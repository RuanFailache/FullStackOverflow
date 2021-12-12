interface AnsweredQuestion {
  question: string;
  student: string;
  grade: string;
  tags: string;
  answered: true;
  submitAt: string;
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

export default AnsweredQuestion;
