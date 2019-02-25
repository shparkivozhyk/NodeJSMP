export class AuthError extends Error {
  public static failedAuth (name: string, message: string) {
    return new AuthError(`${name} authorization is failed`, {
      [name]: message,
    });
  }

  constructor (message: string = "AuthorizationError",
                details: object = undefined) {
    super(message);
  }
}
