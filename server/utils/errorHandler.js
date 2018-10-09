/**
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} - error object
 */
function errorHandler() {
  // eslint-disable-next-line
    return (error, req, res, next) => {
    console.log(error, '============');
    if (!error.code) {
      error.code = 500;
      error.message = 'Exception 500! Operation failed.';
    }
    return res.status(error.code).json({ error: error.message });
  };
}


export const errorFunction = (message, code) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};

export default errorHandler;
