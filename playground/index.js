import oAPI from '../src/oApi';

apiTester();

// 403 - 'https://dummyapi.io/data/v1/'
// 200 - 'https://reqres.in/api/users'
// 404 - 'https://reqres.in/api/users/23'

async function apiTester() {
  const oRequest = await oAPI.post(
    'https://reqres.in/api/users',
    {
      body: {
        name: 'Kacper',
        job: 'bezrobotny',
      },
      ok: sukces => console.log('sukces', sukces),
      fail: err => console.log('błąd', err),
    },
  );

  console.log(oRequest);
}

// const oRequest = await oAPI.get(
//   'https://reqres.in/api/users/23',
//   {
//     headers: {
//       accept: 'application/json',
//     },
//     fail: err => console.log('błąd', err),
//   },
// );
