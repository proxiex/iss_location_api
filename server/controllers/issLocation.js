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
}

const issHistory = new IssHistoryController();

export default issHistory;
