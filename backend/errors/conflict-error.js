class ConflictError extends Error {
  constructor(message = 'Пользователь с указанными данными уже зарегистрирован.') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
