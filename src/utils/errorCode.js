
class ErrorCode {
  static get(name) {
    let error;
    switch (name) {
      case 'userPasswordLength':
        error = {
          error: 'ERROR_USER_PASSWORD_LENGTH'
        };
        break;
      case 'userBadCredentials':
        error = {
          error: 'ERROR_USER_CREDENTIAL_INCORRECT'
        };
        break;
      case 'userPasswordNumber':
        error = {
          error: 'ERROR_USER_PASSWORD_NUMBER'
        };
        break;
      case 'userUsername':
        error = {
          error: 'ERROR_USER_USERNAME'
        };
        break;
    }
    return error;
  }
}

module.exports = ErrorCode;
