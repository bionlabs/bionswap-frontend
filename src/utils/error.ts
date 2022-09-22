interface WitCatchResult<T> {
  result: T | undefined;
  error: any;
}

export const withCatch = async <T>(promise: Promise<any>) => {
  const withCathResult: WitCatchResult<T> = {
    result: undefined,
    error: undefined,
  };

  try {
    withCathResult.result = await promise;
  } catch (error) {
    console.error('with catch error: ', error);
    withCathResult.error = error;
  }

  return withCathResult;
};
