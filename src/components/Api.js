export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(baseUrl, method = "GET", body = null) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(baseUrl, options).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro: ${res.status}`);
      }
      return res.json();
    });
  }

  getCards() {
    return this._makeRequest(`${this._baseUrl}/cards`);
  }

  createCard(card) {
    return this._makeRequest(`${this._baseUrl}/cards`, "POST", card);
  }

  likeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, "PUT");
  }

  unlikeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, "DELETE");
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, "DELETE");
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`);
  }

  updateUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, "PATCH", { name, about });
  }

  updateAvatar(avatarUrl) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, "PATCH", { avatar: avatarUrl });
  }
}
export { Api };

// export default class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   getCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       headers: this._headers,
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao buscar cards: ${res.status}`);
//       }
//       return res.json();
//     });
//   }
//   createCard(card) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify(card),
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao criar card: ${res.status}`);
//       }
//       return res.json();
//     });
//   }
//   likeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this._headers,
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao dar like: ${res.status}`);
//       }
//       return res.json();
//     });
//   }

//   unlikeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this._headers,
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao remover like: ${res.status}`);
//       }
//       return res.json();
//     });
//   }

//   deleteCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: "DELETE",
//       headers: this._headers,
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`erro ao deletar:${res.status}`);
//       }
//       return res.json();
//     });
//   }
//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       headers: this._headers,
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao buscar perfil: ${res.status}`);
//       }
//       return res.json();
//     });
//   }

//   updateUserInfo({ name, about }) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({ name, about }),
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao atualizar perfil: ${res.status}`);
//       }
//       return res.json();
//     });
//   }

// updateAvatar(avatarUrl) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({ avatar: avatarUrl }),
//     }).then((res) => {
//       if (!res.ok) {
//         return Promise.reject(`Erro ao atualizar avatar: ${res.status}`);
//       }
//       return res.json();
//     });
//   }
// }
// export { Api };
