class ForbiddenError extends Error {
  constructor(message = 'Доступ запрещен.') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
