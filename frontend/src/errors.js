class TokenValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenValidationError";
    // Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
    // Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  }
}

export { TokenValidationError, NetworkError };
