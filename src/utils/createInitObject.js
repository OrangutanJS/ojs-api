import formDataCreator from './formDataCreator';

const REQUIRE_QUERIES_ARGUMENT_METHODS = [
  'POST',
  'PUT',
  'PATCH',
];

export default function createInitObject(method, queries, headers, auth) {
  const initObject = { method };
  if (REQUIRE_QUERIES_ARGUMENT_METHODS.includes(method)) {
    if (typeof queries !== 'object') {
      console.error('Queries argument is not object type.');
      return Object.create(null);
    }
    initObject.body = formDataCreator(queries);
  }

  // TODO: autoryzacja
  if (auth) {
    const token = localStorage.getItem('u_key');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const requestHeaders = new Headers();
  if ((typeof headers === 'object') && Object.keys(headers).length) {
    for (const [key, value] of Object.entries(headers)) {
      requestHeaders.append(key, String(value));
    }
  }
  initObject.headers = requestHeaders;

  return initObject;
}
