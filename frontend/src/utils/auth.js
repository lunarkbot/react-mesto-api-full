import {API_BASEURL} from './constants';

class Auth {
  constructor({baseUrl, headers, checker}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._checker = checker;
  }

  signIn({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password,
        email
      }),
      credentials: 'include',
    }).then(res => this._checker(res, 'signIn'));
  }

  signUp({email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password,
        email
      }),
      credentials: 'include',
    }).then(res => this._checker(res, 'signUp'));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
      },
      credentials: 'include',
    }).then(res => this._checker(res, 'checkToken'));
  }
}

export default new Auth( {
  baseUrl: API_BASEURL,
  headers: {
    "Content-Type": "application/json"
  },
  checker: (res, type) => {
    if (res.ok) {
      return res.json();
    } else {
      let message = '';

      switch (res.status) {
        case 400:
          if (type === 'signIn') message = 'Не передано одно из полей.';
          else if (type === 'signUp') message = 'Некорректно заполнено одно из полей.';
          else message = 'Токен не передан или передан не в том формате.';
          break;
        case 401:
          if (type === 'signIn') message = 'Пользователь с email не найден.';
          else message = 'Переданный токен некорректен.';
          break;
        default:
          message = 'Повторите попытку позже.';
      }

      return Promise.reject(`Ошибка: ${res.status}. ${message}`);
    }
  }
})