class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._checkStatus)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkStatus)
  }

  changeUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then(this._checkStatus)
  }


  changeUserAvatar(userInfo) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    })
      .then(this._checkStatus)
  }

  addCard(placeInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: placeInfo.name,
        link: placeInfo.link
      })
    })
      .then(this._checkStatus)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkStatus)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._checkStatus)
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkStatus)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  }
}

export const api = new Api({
  baseUrl: 'http://127.0.0.1:3001',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
});
