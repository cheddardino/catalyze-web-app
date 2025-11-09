export const logError = (error: Error) => {
  console.error('Error:', error.message);
};

export const logInfo = (message: string) => {
  console.log('Info:', message);
};

export const formatResponse = (data: any, statusCode: number = 200) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
};