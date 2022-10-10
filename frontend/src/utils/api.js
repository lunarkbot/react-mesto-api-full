import {
  API_KEY,
  API_BASEURL
} from './constants';

class Api {
  constructor({baseUrl, headers, checker}) {
    this._headers = headers;
    this._userUrl = `${baseUrl}/users/me`;
    this._cardsUrl = `${baseUrl}/cards`;
    this._checker = checker;
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checker);
  }

  setUserData(name, about) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
      credentials: 'include',
    }).then(this._checker);
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checker);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`,{
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checker);
  }

  updateLikes(cardId, isSet = true) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`,{
      method: isSet ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checker);
  }

  addCard(name, link) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
      credentials: 'include',
    }).then(this._checker);
  }

  setAvatar(avatar) {
    return fetch(`${this._userUrl}/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
      credentials: 'include',
    }).then(this._checker);
  }
}

export default new Api({
    baseUrl: API_BASEURL,
    headers: {
      authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    checker: (res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }
  },
);