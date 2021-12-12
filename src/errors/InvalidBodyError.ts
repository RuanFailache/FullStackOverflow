class InvalidBodyError extends Error {
  status: number;

  constructor(message?: string) {
    super(message);
    this.status = 400;
  }
}

export default InvalidBodyError;
