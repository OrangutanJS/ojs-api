import parseResponseData from './parseResponseData';

export default async function requestResponseController(
  response,
  success,
  fail,
  debug,
  auth, // eslint-disable-line no-unused-vars
) {
  const [respData, respText] = await parseResponseData(response);

  const responseObject = {
    status: response.status,
    message: respText,
    data: respData,
    ok: response.ok,
  };

  try {
    if (response.ok) {
      const authToken = response.headers.get('authorization');
      if (authToken) {
        const splittedHeader = authToken.split(' ');
        if (splittedHeader.length === 2) {
          // eslint-disable-next-line prefer-destructuring
          responseObject.auth = splittedHeader[1];
        }
      }
      debug && console.log('ApiRequestResponse. Response Object (Success): ', responseObject);
      success(responseObject);
      return responseObject;
    }

    debug && console.log('ApiRequestResponse. Response Object (Error): ', responseObject);
    fail(responseObject);
    return responseObject;
  } catch (exception) {
    console.error(exception);
    responseObject.message = 'Nieznany błąd.';
    return fail(responseObject);
  }
}
