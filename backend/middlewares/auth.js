const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'enc-key-should-be-here' } = process.env;

const NotAuthorizedError = require('../errors/NotAuthorizedError');

function auth(req, res, next) {
  const { authorization } = req.headers;
  const err = new NotAuthorizedError('Необходима авторизация');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(err);
  }

  req.user = payload;

  next();
}

module.exports = { auth };
