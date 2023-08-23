const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const NotUniqueError = require('../errors/NotUniqueError');

const getUsers = (req, res, next) => {
  user.find({})
    .then((results) => res.send(results))
    .catch(next);
};

const getUser = (req, res, next) => {
  user.findById(req.params.userId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else {
        res.send(result);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((result) => res.status(201).send({
      name,
      about,
      avatar,
      email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new NotUniqueError('Пользователь с таким e-mail уже существует'));
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else {
        res.send(result);
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else {
        res.send(result);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCreds(email, password)
    .then((result) => {
      res.send({
        token: jwt.sign({ _id: result._id }, 'enc-key-should-be-here', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  user.findById(req.user._id)
    .then((result) => res.send(result))
    .catch(next);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
