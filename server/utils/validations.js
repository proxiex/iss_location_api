import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @static
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signup(request, response, next) {
    const {
      avatar,
      name,
      email,
      username,
      password

    } = request.body;

    const userData = {
      avatar,
      name,
      email,
      username,
      password
    };

    const userDataRules = {
      email: 'required|string|email',
      password: 'required|min:6',
      username: 'required|string|min:5',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      request.body = {
        email: email.trim(),
        username: username.trim(),
        password: password.trim()
      };
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }
}

export default Validate;
