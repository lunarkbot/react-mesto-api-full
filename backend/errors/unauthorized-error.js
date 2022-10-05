class UnauthorizedError extends Error {
  constructor(message = 'Требуется авторизация.') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
