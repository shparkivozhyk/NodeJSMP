interface SuccessResponse {
  email: string;
  username?: string;
  token: string;
}

interface ErrorResponse {
  code: string;
  message: string;
  extendedMessage?: string;
}

export const successResponse = ({ email, username, token, }: SuccessResponse) => {
  return {
    "code": "200",
    "message": "OK",
    "data": {
      "user": {
        "email": email,
        "username": username,
      },
    },
    "token": token,
  };
};

export const errorResponse = ({code, message, extendedMessage, }: ErrorResponse) => {
  return {
    "code": code,
    "message": message,
    "data": {
      "extendedMessage": extendedMessage,
    },
  };
};
