class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json()
        .then((result) => {
          return Promise.reject(`Ошибка ${res.status}: ${result.message}`);
        });
    }
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this._checkStatus)
  }

  authorise(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this._checkStatus)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkStatus)
  }
}

export const auth = new Auth('https://api.mestodep.nomoredomainsicu.ru');
