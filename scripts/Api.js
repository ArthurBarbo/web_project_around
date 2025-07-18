export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao buscar cards: ${res.status}`);
      }
      return res.json();
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
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao dar like: ${res.status}`);
      }
      return res.json();
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao remover like: ${res.status}`);
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
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao buscar perfil: ${res.status}`);
      }
      return res.json();
    });
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao atualizar perfil: ${res.status}`);
      }
      return res.json();
    });
  }
}

export { Api };

// 2 CHAMADAS DE CARTÃO
