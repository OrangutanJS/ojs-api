import formDataCreator from "./utils/formDataCreator";

const APIRequestPOST = (uri, { body, ok = console.log, fail = console.error, headers, debug = false, auth = true} = Object.create(null))=> APIRequestV2({
    method: 'POST',
    uri,
    queries: body,
    success: ok,
    fail,
    headers,
    debug,
    auth
});

const APIRequestGET = (uri, { ok = console.log, fail = console.error, headers, debug = false, auth = true} = Object.create(null))=> APIRequestV2({
    method: 'GET',
    uri,
    success: ok,
    fail,
    headers,
    debug,
    auth
});

const APIRequestPUT = (uri, { queries, ok = console.log, fail = console.error, headers, debug = false, auth = true} = Object.create(null)) => APIRequestV2({
    method: 'PUT',
    uri,
    queries,
    success: ok,
    fail,
    headers,
    debug,
    auth
});

const APIRequestDELETE = (uri, {ok = console.log, fail = console.error, headers, debug = false, auth = true} = Object.create(null)) => APIRequest({
    method: 'DELETE',
    uri,
    success: ok,
    fail,
    headers,
    debug,
    auth
});

export const oAPI = {
    post: APIRequestPOST,
    get: APIRequestGET,
    delete: APIRequestDELETE,
    put: APIRequestPUT
};


const APIRequest = ({method, uri, queries, success, fail, headers={}, debug, auth}) =>{
    const initObject = createInitObject(method, queries, headers, auth);
    if (!Object.keys(initObject).length){
        return false;
    }

    return fetch(
        uri,
        initObject
    )
        .then(async response=> await requestResponseController(response, success, fail, Boolean(debug), auth))
        .catch(async err=> await requestResponseController(err, success, fail, Boolean(debug), auth));
};

const createInitObject = (method, queries, headers, auth)=>{
    const initObject = {
        method: method
    };
    if (initObject.method === 'POST' || initObject.method === 'PUT'){
        if (typeof queries !== 'object'){
            console.error('Queries is not object type');
            return Object.create(null);
        }
        initObject.body = formDataCreator(queries);
    }

    if(auth){
        const token = localStorage.getItem('u_key');
        if(token){
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    if ((typeof headers === 'object') && Object.keys(headers).length){
        const requestHeaders = new Headers();
        for (const [ key, value ]of Object.entries(headers)){
            requestHeaders.append(key, value);
        }
        initObject.headers = requestHeaders;
    }

    return initObject;
};


const requestResponseController = async (response, success, fail, debug, auth) => {

    const [ respData, respText ] = await responseDataParse(response);

    const responseObject = {
        status: response.status,
        message: respText,
        data: respData,
        ok: response.ok
    };

    try {
        if (response.ok){
            const authToken = response.headers.get('authorization');
            if (authToken){
                const splittedHeader = authToken.split(' ');
                if (splittedHeader.length === 2){
                    responseObject.auth = splittedHeader[1];
                }
            }
            debug && console.log('ApiRequestResponse. Response Object (Success): ', responseObject);
            success(responseObject)
            return responseObject;
        }

        debug && console.log('ApiRequestResponse. Response Object (Error): ', responseObject);
        fail(responseObject);
        return responseObject;

    }catch (exception) {
        console.error(exception);
        responseObject.message = 'Nieznany błąd.';
        return fail(responseObject);
    }
};

const responseDataParse = async response => {
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

        return [ respData, respTextToReturn ];

    }catch (e) {
        console.error('API methods: data parsing error.');
        return [ Object.create(null), 'Nieznany błąd' ];
    }
};

const getStatusCodeMessage = response => {
    if (response.ok){
        switch (response.status){
            case 200: return 'OK';
            case 201: return 'Utworzono';
            case 202: return 'Zaakceptowano';
            case 204: return 'Sukces. Brak danych.';
            default: return 'Sukces';
        }
    }else {
        switch (response.status){
            case 302: return 'Przekierowano na inny zasób.';
            case 304: return 'Przekierowano: Nie zmodyfikowano.';
            case 400: return 'Złe żądanie.';
            case 401: return 'Błąd autoryzacji.';
            case 403: return 'Brak dostępu do zasobu.';
            case 404: return 'Nie znaleziono zasobu.';
            case 409: return 'Konflikt. Niepoprawne dane.';
            case 500: return 'Błąd żądania: Nieznany błąd.';
            default: return 'Nieznany błąd.';
        }
    }
};
