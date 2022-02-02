/* eslint-disable padded-blocks */
import oAPI from '../src/oApi';

const URI = 'https://reqres.in/api/users';
apiTester();

// 403 - 'https://dummyapi.io/data/v1/'
// 200 - 'https://reqres.in/api/users'
// 404 - 'https://reqres.in/api/users/23'

async function apiTester() {
  const exampleStoreObject = {
    name: 'Kacper',
    surname: 'Stodolak',
    company: 'Allegro',
    imageFile: new File([''], 'exampleFile'),
  };

  const response = await oAPI.post(
    URI,
    // Przekazanie obiektu stanu do wysłania
    { body: exampleStoreObject },
  );

  console.log(response);
}

// async function apiTester() {
//   const response = await oAPI.get(
//     'https://reqres.in/api/users/23',
//     {
//       headers: {
//         accept: 'application/json',
//       },
//     },
//   );

//   if (response.ok) {
//     console.log(response);
//   } else {
//     console.error(response);
//   }
// }
