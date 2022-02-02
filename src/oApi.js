import makeApiRequest from './utils/makeApiRequest';

export default {
  post: APIRequestPOST,
  get: APIRequestGET,
  delete: APIRequestDELETE,
  put: APIRequestPUT,
  patch: APIRequestPATCH,
};

function APIRequestPOST(
  uri,
  {
    body,
    ok = () => { },
    fail = console.error,
    headers,
    debug = false,
    auth = true,
  } = Object.create(null),
) {
  return makeApiRequest({
    method: 'POST',
    uri,
    queries: body,
    success: ok,
    fail,
    headers,
    debug,
    auth,
  });
}

function APIRequestGET(
  uri,
  {
    ok = () => { },
    fail = console.error,
    headers,
    debug = false,
    auth = true,
  } = Object.create(null),
) {
  return makeApiRequest({
    method: 'GET',
    uri,
    success: ok,
    fail,
    headers,
    debug,
    auth,
  });
}

function APIRequestPUT(
  uri,
  {
    body,
    ok = console.log,
    fail = console.error,
    headers,
    debug = false,
    auth = true,
  } = Object.create(null),
) {
  return makeApiRequest({
    method: 'PUT',
    uri,
    queries: body,
    success: ok,
    fail,
    headers,
    debug,
    auth,
  });
}

function APIRequestPATCH(
  uri,
  {
    body,
    ok = console.log,
    fail = console.error,
    headers,
    debug = false,
    auth = true,
  } = Object.create(null),
) {
  return makeApiRequest({
    method: 'PATCH',
    uri,
    queries: body,
    success: ok,
    fail,
    headers,
    debug,
    auth,
  });
}

function APIRequestDELETE(
  uri,
  {
    ok = console.log,
    fail = console.error,
    headers,
    debug = false,
    auth = true,
  } = Object.create(null),
) {
  return makeApiRequest({
    method: 'DELETE',
    uri,
    success: ok,
    fail,
    headers,
    debug,
    auth,
  });
}
