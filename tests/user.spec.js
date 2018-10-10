import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import fakeData from './fakeData';

chai.use(chaiHttp);

const { expect } = chai;
const baseUrl = '/api/v1/auth';
export let token;

describe('ISS Location API ::: ', () => {
  it('should get home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        const message = 'You are welcome to Dear Diary, please hit a valid endpoint to get started.';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });

  it('should get come back later page', (done) => {
    chai.request(app)
      .post('/')
      .end((err, res) => {
        const message = "This endpoint doesn't exist yet, checkback sometime in future an we may have it";
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
  });
});

describe('ISS Location API ::: USER', () => {
  describe('Signup a User', () => {
    it('should not allow user signup with no email', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.noEmailUsers)
        .end((err, res) => {
          const message = {
            email: [
              'The email field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not allow user signup with no email', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.noEmailUsers)
        .end((err, res) => {
          const message = {
            email: [
              'The email field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not allow user signup with no username.', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.noUsernameUsers)
        .end((err, res) => {
          const message = {
            username: [
              'The username field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not allow user signup with no password.', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.noPasswordUsers)
        .end((err, res) => {
          const message = {
            password: [
              'The password field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should allow user signup with no errors.', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.newUsers)
        .end((err, res) => {
          const message = 'Signup successfull!';
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          expect(res.body).to.haveOwnProperty('token').to.not.be.null;
          expect(res.body).to.haveOwnProperty('status').to.eql('success');
          done();
        });
    });

    it('should not allow user signup with same email or username twice.', (done) => {
      chai.request(app)
        .post(`${baseUrl}/signup`)
        .send(fakeData.newUsers)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('message').to.not.be.null;
          expect(res.body).to.haveOwnProperty('status').to.eql('failed');
          done();
        });
    });
  });
  describe('Signin a User', () => {
    it('should not let user sigin with no password', (done) => {
      const user = {
        email: fakeData.newUsers.email,
      };
      chai.request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          const message = {
            password: [
              'The password field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not let user sigin with no email', (done) => {
      const user = {
        password: 'fakeData.newUsers.password'
      };
      chai.request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          const message = {
            email: [
              'The email field is required.'
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not let user sigin with wrong password', (done) => {
      const user = {
        email: fakeData.newUsers.email,
        password: 'fakeData.newUsers.password'
      };
      chai.request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          const message = 'Incorrect signin credentials!';
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not let user sigin with wrong email or password', (done) => {
      const user = {
        email: 'someguys@me.com',
        password: 'fakeData.newUsers.password'
      };
      chai.request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          const message = 'Incorrect signin credentials!';
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should let user sigin with no errors', (done) => {
      const user = {
        email: fakeData.newUsers.email,
        password: fakeData.newUsers.password
      };
      chai.request(app)
        .post(`${baseUrl}/login`)
        .send(user)
        .end((err, res) => {
          const message = 'Login successfull!';
          token = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          expect(res.body).to.haveOwnProperty('status').to.eql('success');
          expect(res.body).to.haveOwnProperty('token').to.not.be.null;
          done();
        });
    });
  });
});
