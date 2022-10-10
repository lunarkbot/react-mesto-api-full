const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { SECRET_KEY } = require('../constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  res.header('test', req.cookies);

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  next();
  return null;
};
