const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const ERROR_404 = 'Карточка с указанным ID не найдена.';

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError(ERROR_404);
      }
      if (!result.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => {
          if (!card) {
            throw new ForbiddenError();
          }
          res.send({ data: card });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError());
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_404);
      }
      res.send({
        _id: card._id,
        name: card.name,
        link: card.link,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_404);
      }
      res.send({
        _id: card._id,
        name: card.name,
        link: card.link,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};
