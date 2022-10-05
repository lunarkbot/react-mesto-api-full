const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, 'iddqd&idkfa');
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload;

  next();
  return null;
};
