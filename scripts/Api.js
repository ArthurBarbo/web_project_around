export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao criar card: ${res.status}`);
      }
      return res.json();
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`erro ao deletar:${res.status}`);
      }
      return res.json();
    });
  }
}

export { Api };
