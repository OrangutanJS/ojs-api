import createInitObject from './createInitObject';
import requestResponseController from './requestResponseController';

export default function makeApiRequest({
  method,
  uri,
  queries,
  success,
  fail,
  headers = {},
  debug,
  auth,
}) {
  const initObject = createInitObject(method, queries, headers, auth);
  if (!Object.keys(initObject).length) {
    return false;
  }

  return fetch(
    uri,
    initObject,
  )
    .then(async response => requestResponseController(response, success, fail, Boolean(debug), auth)) // eslint-disable-line max-len
    .catch(async err => requestResponseController(err, success, fail, Boolean(debug), auth));
}
