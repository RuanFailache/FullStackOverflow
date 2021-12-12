const errorStatus = (nameError: string): number | null => {
  if (nameError === 'InvalidBody') {
    return 400;
  } if (nameError === 'NotFoundError') {
    return 404;
  } if (nameError === 'ConflictError') {
    return 409;
  }

  return null;
};

export default errorStatus;
