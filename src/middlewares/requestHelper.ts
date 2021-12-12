class CustomRequest extends Request {
  public token: string;

  headers: Headers & {
    authorization?: string,
  };
}

export default CustomRequest;
