const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { patternUrl } = require('../constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(patternUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
