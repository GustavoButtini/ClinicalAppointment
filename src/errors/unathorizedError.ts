export class UnathorizedError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UnathorizedError.prototype);
  }
}
