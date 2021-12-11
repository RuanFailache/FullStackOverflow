interface NotAnsweredQuestion {
  question: string;
  student: string;
  grade: string;
  tags: string;
  answered: false;
  submitAt: string;
}

export default NotAnsweredQuestion;
