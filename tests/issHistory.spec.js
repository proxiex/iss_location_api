import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import fakeData from './fakeData';
import { token } from './user.spec';

const { expect } = chai;
chai.use(chaiHttp);
const baseUrl = '/api/v1/iss/location';

describe('ISS Location API ::: ISS History ', () => {
  describe('Create ::: ISS History ', () => {
    it('should throw error if log and lat are missing', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.noLatLng)
        .end((err, res) => {
          const message = {
            'location.lat': [
              'The location.lat field is required.'
            ],
            'location.lng': [
              'The location.lng field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should throw error if datetime is missing', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.noDatetime)
        .end((err, res) => {
          const message = {
            datetime: [
              'The datetime field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should throw error if altitude is missing', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.noAlt)
        .end((err, res) => {
          const message = {
            altitude: [
              'The altitude field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should throw error if passes is missing', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.noPasses)
        .end((err, res) => {
          const message = {
            passes: [
              'The passes field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should throw error if token is not provided', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const message = 'Unauthorised User! Please provide a valid token';

          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should return a message if user has no history yet', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', 'token')
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const message = 'Token could not be authenticated';

          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not create another search history if it already exists', (done) => {
      chai.request(app)
        .get(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const status = 'success';
          const message = 'You do not have any ISS location search history yet';

          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('status').to.eql(status);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should save user iss search history successfully', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const message = 'History saved';
          const status = 'success';

          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          expect(res.body).to.haveOwnProperty('status').to.eql(status);
          expect(res.body).to.haveOwnProperty('history').to.not.be.null;
          done();
        });
    });

    it('should not create another search history if it already exists', (done) => {
      chai.request(app)
        .post(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const message = 'Location already exists';
          const status = 'success';

          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          expect(res.body).to.haveOwnProperty('status').to.eql(status);
          expect(res.body).to.haveOwnProperty('history').to.not.be.null;
          done();
        });
    });
  });
  describe('View ::: ISS History ', () => {
    it('should show list of user ISS search history', (done) => {
      chai.request(app)
        .get(`${baseUrl}`)
        .set('token', token)
        .send(fakeData.issHistory.valid)
        .end((err, res) => {
          const status = 'success';

          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('status').to.eql(status);
          expect(res.body).to.haveOwnProperty('history').to.not.be.null;
          done();
        });
    });
  });
});
