import axios from 'axios';
import { IssHistory } from '../models';

/**
 *
 *
 * @class IssHistoryController
 */
class IssHistoryController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} -
   * @memberof IssHistoryController
   */
  addHistory(req, res, next) {
    const { id } = req.decoded;
    const {
      location: { lat, lng }, altitude, datetime, passes
    } = req.body;

    IssHistory.findOne({
      'location.latitude': lat,
      'location.longitude': lng,
      userId: id
    }).then((history) => {
      if (history !== null) {
        return res.status(200).json({
          status: 'success',
          message: 'Location already exists',
          history
        });
      }
    }).then(() => {
      IssHistory.create({
        userId: id,
        location: {
          latitude: lat,
          longitude: lng
        },
        altitude,
        datetime,
        passes
      }).then((history) => {
        res.status(201).json({
          status: 'success',
          message: 'History saved',
          history
        });
      });
    }).catch(err => next(err));

    return this;
  }

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} -
   * @memberof IssHistoryController
   */
  viewHistory(req, res, next) {
    const { id } = req.decoded;
    IssHistory.find({ userId: id }).then((history) => {
      if (history.length < 1) {
        return res.status(200).json({
          status: 'success',
          message: 'You do not have any ISS location search history yet'
        });
      }
      res.status(200).json({
        status: 'success',
        history
      });
    }).catch(err => next(err));

    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {any} -
   * @memberof IssHistoryController
   */
  currentLocation(req, res, next) {
    axios.get('http://api.open-notify.org/iss-now.json')
      .then((response) => {
        res.status(200).json({
          data: response.data
        });
      })
      .catch((error) => {
        next(error);
      });
    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {any} -
   * @memberof IssHistoryController
   */
  passtLocation(req, res, next) {
    const { lng, lat } = req.body;
    const latitude = parseInt(lat, 10);
    const longitude = parseInt(lng, 10);

    if (latitude < -80 || latitude > 80) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid Latitude, should be in the range  -80 - 80 '
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid longitude, should be in the range  -180 - 180 '
      });
    }

    axios.get(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lng}`)
      .then((response) => {
        res.status(200).json({
          data: response.data
        });
      })
      .catch((error) => {
        next(error);
      });
    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {any} -
   * @memberof IssHistoryController
   */
  people(req, res, next) {
    axios.get('http://api.open-notify.org/astros.json')
      .then((response) => {
        res.status(200).json({
          data: response.data
        });
      })
      .catch((error) => {
        next(error);
      });
    return this;
  }
}

const issHistory = new IssHistoryController();

export default issHistory;
