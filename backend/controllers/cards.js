const card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NotOwnerError = require('../errors/NotOwnerError');

const getCards = (req, res, next) => {
  card.find({})
    .then((results) => res.send(results))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((result) => res.status(201).send(result))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      if (!(result.owner.toString() === req.user._id)) {
        throw new NotOwnerError('Вы не являетесь автором данной карточки');
      }

      return card.findByIdAndRemove(req.params.cardId);
    })
    .then((result) => res.send(result))
    .catch(next);
};

const addLike = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(result);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      res.send(result);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
