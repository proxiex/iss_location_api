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

  /**
   *
   * @static
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
  static login(request, response, next) {
    const {
      email,
      password
    } = request.body;

    const userData = {
      email,
      password
    };

    const userDataRules = {
      email: 'required|email|string',
      password: 'required|min:6',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }

  /**
   *
   * @static
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
  static issLocation(request, response, next) {
    const {
      location: {
        lat,
        lng
      },
      altitude,
      datetime,
      passes
    } = request.body;

    const issLocationData = {
      location: {
        lat,
        lng
      },
      altitude,
      datetime,
      passes
    };

    const issLocationRules = {
      location: {
        lat: 'required',
        lng: 'required'
      },
      altitude: 'required',
      datetime: 'required',
      passes: 'required|array'
    };

    const validation = new Validator(issLocationData, issLocationRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }
}

export default Validate;
