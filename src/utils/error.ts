interface WitCatchResult {
  result: any;
  error: any;
}

export const withCatch = async (promise: Promise<any>) => {
  const withCathResult: WitCatchResult = {
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
