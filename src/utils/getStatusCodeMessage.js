export default function getStatusCodeMessage(response) {
  if (response.ok) {
    switch (response.status) {
      case 200: return 'OK';
      case 201: return 'Utworzono';
      case 202: return 'Zaakceptowano';
      case 204: return 'Sukces. Brak danych.';
      default: return 'Sukces';
    }
  } else {
    switch (response.status) {
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
}
