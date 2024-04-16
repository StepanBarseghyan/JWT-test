class AuthenticationError {
  static Unauthorized(res, message = "Unauthorized access") {
    return res.status(401).send({ message });
  }

  static BadRequest(res, message = "Bad request") {
    return res.status(400).send({ message });
  }
}

class ServerError {
  static InternalServerError(res, message = "Internal server error") {
    return res.status(500).send({ message });
  }
}

export { AuthenticationError, ServerError };
