export const parseMongoErrors = (errors: any) => {
  const parsedErrors = Object.entries(errors).map((error) => {
    const key = error[0];
    const value: any = error[1];
    return {
      field: key,
      message: value.message,
    };
  });
  return parsedErrors;
};
