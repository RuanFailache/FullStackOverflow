class InvalidBodyError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidBodyError';
  }
}

export default InvalidBodyError;
