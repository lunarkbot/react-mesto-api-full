const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const patternUrl = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000/',
  'http://localhost:3000',
  'https://15.kbot.students.nomoredomains.icu',
  '15.kbot.students.nomoredomains.icu',
];

module.exports = {
  patternUrl,
  allowedCors,
  SECRET_KEY,
};
