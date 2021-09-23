import getStatusCodeMessage from './getStatusCodeMessage';

export default async function parseResponseData(response) {
  let respText = '';
  let respData = Object.create(null);
  try {
    switch (response.headers.get('content-type')) {
      case 'application/pdf':
        respData = await response.blob();
        break;
      case 'application/json':
        respData = await response.json();
        break;
      case 'text/assets':
      case 'text/plain':
      case 'text/plain; charset=UTF-8':
        respText = await response.text();
        break;
      default:
        respData = await response.json();
        break;
    }
    const respTextToReturn = respText || getStatusCodeMessage(response);

    return [respData, respTextToReturn];
  } catch (e) {
    console.error('API methods: data parsing error.');
    return [Object.create(null), 'Nieznany błąd'];
  }
}
