class appError extends Error {
  constructor() {
    super();
  }
  create(status, errorType, message) {
    this.status = status;
    this.errorType = errorType;
    this.message = message;
    return this;
  }
}

module.exports = new appError();
