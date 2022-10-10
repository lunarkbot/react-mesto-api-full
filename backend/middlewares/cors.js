const {
  allowedCors,
} = require('../constants');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  //if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', "*");
  //}

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
};
