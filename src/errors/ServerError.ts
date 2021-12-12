class ServerError extends Error {
  status: number;

  constructor() {
    super();
    this.status = 500;
  }
}

export default ServerError;
